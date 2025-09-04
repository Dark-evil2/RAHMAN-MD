const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed","pong"], use: '.ping',
    desc: "Check bot's response time with music.",
    category: "main",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        const text = `*_ʀᴀʜᴍᴀɴ-ᴍᴅ sᴘᴇᴇᴅ... ${responseTime.toFixed(2)}ᴍs ${reactionEmoji}_*🚀`;

        // Pehle text send
        await conn.sendMessage(from, { text }, { quoted: mek });

        // 🎶 Add music
        let musicUrl = "https://files.catbox.moe/k0em5t.mp3"; // updated mp3 link
        await conn.sendMessage(from, {
            audio: { url: musicUrl },
            mimetype: 'audio/mpeg',
            ptt: false,
            fileName: "Rahman-MD-Ping.mp3"
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});