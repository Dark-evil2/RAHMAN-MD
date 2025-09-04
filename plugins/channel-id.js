const { cmd } = require("../command");

cmd({
  pattern: "cid",
  alias: ["newsletter", "id"],
  react: "📡",
  desc: "Get WhatsApp Channel info from link",
  category: "whatsapp",
  filename: __filename
}, async (conn, mek, m, {
  from,
  args,
  q,
  reply
}) => {
  try {
    if (!q) return reply("Please provide a WhatsApp Channel link.❎\n\n*Example:* .cinfo https://whatsapp.com/channel/123456789");

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match) return reply("⚠️ *Invalid channel link format.*\n\nMake sure it looks like:\nhttps://whatsapp.com/channel/xxxxxxxxx");

    const inviteId = match[1];

    let metadata;
    try {
      metadata = await conn.newsletterMetadata("invite", inviteId);
    } catch (e) {
      return reply("❌ Failed to fetch channel metadata. Make sure the link is correct.");
    }

    if (!metadata || !metadata.id) return reply("❌ Channel not found or inaccessible.");

    const infoText = `‎‎╔══ ❖•ೋ° °ೋ•❖ ══╗
‎             𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐈𝐧𝐟𝐨  
‎╚══ ❖•ೋ° °ೋ•❖ ══╝
‎
‎┏━━━━━━━━━━━━━━━━━━┓
‎┃ 🆔  ɪᴅ: ${metadata.id}
‎┃ ✨  ɴᴀᴍᴇ: ${metadata.name}
‎┃ 👥  ғᴏʟʟᴏᴡᴇʀs: ${metadata.subscribers?.toLocaleString() || "N/A"}
‎┃ 📅  ᴄʀᴇᴀᴛᴇᴅ ᴏɴ:
‎┃     ${metadata.creation_time ? new Date(metadata.creation_time * 1000).toLocaleString("id-ID") : "Unknown"}
‎┗━━━━━━━━━━━━━━━━━━┛
‎*╭───────────────━┈⍟*
‎┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_* 
‎*╰───────────────━┈⍟*`;

    if (metadata.preview) {
      await conn.sendMessage(from, {
        image: { url: `https://pps.whatsapp.net${metadata.preview}` },
        caption: infoText
      }, { quoted: m });
    } else {
      await reply(infoText);
    }

  } catch (error) {
    console.error("❌ Error in .cinfo plugin:", error);
    reply("⚠️ An unexpected error occurred.");
  }
});
