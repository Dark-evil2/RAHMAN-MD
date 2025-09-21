const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "tagadmins",
    alias: ["admin", "tagadmin", "gc_tagadmins"], // merged aliases
    react: "👑",
    desc: "To Tag all Admins of the Group",
    category: "group",
    use: '.tagadmins [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let admins = await getGroupAdmins(participants);
        if (!admins || admins.length === 0) return reply("❌ No admins found in this group.");

        let emojis = ['👑', '⚡', '🌟', '✨', '🎖️', '💎', '🔱', '🛡️', '🚀', '🏆'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Better message handling
        let message = args.length > 0 ? args.join(" ") : "ᴀᴛᴛᴇɴᴛɪᴏɴ ᴀᴅᴍɪɴs";

        let teks = `▢ ɢʀᴏᴜᴘ : *${groupName}*\n▢ ᴀᴅᴍɪɴs : *${admins.length}*\n▢ ᴍᴇssᴀɢᴇ: *${message}*\n\n┌───⊷ *ᴀᴅᴍɪɴ ᴍᴇɴᴛɪᴏɴs*\n`;

        for (let admin of admins) {
            teks += `${randomEmoji} @${admin.split('@')[0]}\n`;
        }

        teks += "└──✪ ʀᴀʜᴍᴀɴ ┃ ᴍᴅ ✪──";

        await conn.sendMessage(from, { text: teks, mentions: admins }, { quoted: mek });

    } catch (e) {
        console.error("TagAdmins Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});
