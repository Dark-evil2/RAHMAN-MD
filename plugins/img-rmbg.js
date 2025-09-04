const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

cmd({
  pattern: "rmbg",
  alias: ["removebg"],
  react: "📸",
  desc: "Remove background from images",
  category: "img_edit",
  use: ".rmbg [reply to image]",
  filename: __filename
}, async (conn, message, m, { reply }) => {
  try {
    // Check if quoted message has image
    const quotedMsg = message.quoted ? message.quoted : message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || "";

    if (!mimeType || !mimeType.startsWith("image/")) {
      return reply("❌ Please reply to a valid image (JPEG/PNG).");
    }

    // Download the media
    const mediaBuffer = await quotedMsg.download();
    const fileSize = formatBytes(mediaBuffer.length);

    let extension = "";
    if (mimeType.includes("jpeg")) extension = ".jpg";
    else if (mimeType.includes("png")) extension = ".png";
    else return reply("❌ Only JPEG and PNG formats are supported.");

    // Save to temp file
    const tempFilePath = path.join(os.tmpdir(), `img_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload image to Catbox for direct link
    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tempFilePath), `image${extension}`);
    form.append("reqtype", "fileupload");

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders(),
    });

    const imageUrl = uploadResponse.data.trim();
    fs.unlinkSync(tempFilePath); // Delete temp file

    if (!imageUrl || !imageUrl.startsWith("http")) {
      return reply("❌ Failed to upload image to Catbox.");
    }

    // Call RemoveBG API
    const apiUrl = `https://apis.davidcyriltech.my.id/removebg?url=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response.data) {
      return reply("❌ API failed to return processed image.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `✅ Background Removed Successfully!\n\n*╭───────────────━┈⍟*\n┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*\n*╰───────────────━┈⍟*`,
    });

  } catch (error) {
    console.error("Rmbg Error:", error);
    reply(`⚠️ Error: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});