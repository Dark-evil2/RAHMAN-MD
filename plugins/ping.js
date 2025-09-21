const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed","pong"], 
    use: '.ping',
    desc: "Check bot's response time with music.",
    category: "main",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        // Fix emoji 🚀
        const fixedEmoji = "🚀";

        // Reaction
        await conn.sendMessage(from, {
            react: { text: fixedEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        const text = `*_ʀᴀʜᴍᴀɴ-ᴍᴅ sᴘᴇᴇᴅ... ${responseTime.toFixed(2)}ᴍs ${fixedEmoji}_*`;

        // Text send 
        await conn.sendMessage(from, { text }, { quoted: mek });

        // 🎶 Music add 
        let musicUrl = "https://files.catbox.moe/n11qig.mp3"; 
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