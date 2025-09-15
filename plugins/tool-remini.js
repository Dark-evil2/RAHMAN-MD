const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "remini",
  alias: ["enhance", "hd", "upscale"],
  react: '✨',
  desc: "Enhance photo quality using AI",
  category: "utility",
  use: ".remini [reply to image]",
  filename: __filename
}, async (client, message, { reply, quoted }) => {
  try {
    const quotedMsg = quoted || message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType || !mimeType.startsWith('image/')) {
      return reply("❌ Please reply to a valid image (JPEG/PNG)");
    }

    // Download media
    const mediaBuffer = await quotedMsg.download();

    // Detect extension
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else return reply("❌ Unsupported format. Use JPEG/PNG only.");

    // Temp file save
    const tempFilePath = path.join(os.tmpdir(), `remini_input_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath);

    if (!imageUrl || !imageUrl.startsWith("http")) {
      return reply("❌ Failed to upload image to Catbox.");
    }

    // Call Remini API
    await reply("🔄 ᴇɴʜᴀɴᴄɪɴɢ ɪᴍᴀɢᴇ ϙᴜᴀʟɪᴛʏ...");
    const apiUrl = `https://apis.davidcyriltech.my.id/remini?url=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, {
      responseType: "arraybuffer",
      timeout: 60000
    });

    if (!response.data || response.data.length < 100) {
      return reply("❌ API returned invalid image data.");
    }

    // Save output
    const outputPath = path.join(os.tmpdir(), `remini_output_${Date.now()}.jpg`);
    fs.writeFileSync(outputPath, response.data);

    // Fancy Caption
    const fancyCaption = `
*╭──────────────━┈⍟*
‎┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_* 
‎*╰──────────────━┈⍟*
    `;

    // Send back enhanced image
    await client.sendMessage(message.chat, {
      image: fs.readFileSync(outputPath),
      caption: fancyCaption,
    }, { quoted: message });

    fs.unlinkSync(outputPath);

  } catch (error) {
    console.error("Image Enhancement Error:", error);
    await reply(`❌ Error: ${error.message || "Failed to enhance image. Try again later."}`);
  }
});
