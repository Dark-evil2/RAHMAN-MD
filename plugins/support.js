const { cmd } = require('../command');

// 🛠️ Support Command
cmd({
    pattern: "support",
    desc: "Get the link to the support group or page.",
    react: "🛠️",
    category: "utility",
    use: ".support",
}, async (conn, mek, m) => {
    try {
        const channelLink = "https://whatsapp.com/channel/0029VaEV2x85kg7Eid9iK43R";
        const supportLink = "https://chat.whatsapp.com/JvaJHe9m6N6CMWqTRSAcbp";

        // Stylish message send
        const sentMsg = await conn.sendMessage(m.chat, {
            text: `╭╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╮
> *_Tʜᴀɴᴋs ғᴏʀ ᴄᴏɴᴛᴀᴄᴛɪɴɢ ᴡɪᴛʜ ʀᴀʜᴍᴀɴ ᴛᴇᴄʜ_*
> *_ʜᴇʀᴇ's ᴛʜᴇ ʟɪɴᴋ ᴛᴏ ᴏᴜʀ ᴏғғɪᴄɪᴀʟ ʀᴀʜᴍᴀɴ ᴍᴅ ᴄʜᴀɴɴᴇʟ ᴊᴏɪɴ ᴜs ᴛᴏ sᴛᴀʏ ᴜᴘᴅᴀᴛᴇᴅ_*
> *_Fᴏʟʟᴏᴡ Wʜᴀᴛsᴘᴘ Cʜᴀɴɴᴇʟ_*
> *_${channelLink}_*
> ------------------------------------------------
> *_ɴᴇᴇᴅ ʜᴇʟᴘ ᴏʀ ʜᴀᴠᴇ ǫᴜᴇsᴛɪᴏɴs ᴊᴏɪɴ ᴛʜᴇ ʀᴀʜᴍᴀɴ ᴍᴅ sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ ғᴇᴇʟ ғʀᴇᴇ ᴛᴏ ᴀsᴋ ǫᴜᴇsᴛɪᴏɴs ᴏʀ ʀᴇᴘᴏʀᴛ ɪssᴜᴇs_*
> *_Jᴏɪɴ Wʜᴀᴛsᴀᴘᴘ Gʀᴏᴜᴘ_*
> *_${supportLink}_*
> ------------------------------------------------
      *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ ᴛᴇᴄʜ_*
╰╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╯`
        }, { quoted: mek });

        // Auto reaction on sent message
        await conn.sendMessage(m.chat, { react: { text: "👍", key: sentMsg.key } });

    } catch (error) {
        console.error("Error sending support info:", error.message);
        await m.reply("❌ Sorry, an error occurred while trying to send the support information.");
    }
});
