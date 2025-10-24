const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "metaai",
    alias: ["rahmanullah", "meta"],
    react: "🤖",
    desc: "Talk with Rahman AI",
    category: "ai",
    use: '.metaai <your question>',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a question to ask Rahman AI.");

        // React: Processing
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        // Show "typing" presence
        await conn.sendPresenceUpdate("composing", from);

        // Fetch AI response
        const { data } = await axios.get(`https://apis.davidcyriltech.my.id/ai/metaai?text=${encodeURIComponent(q)}`);

        if (!data.success || !data.response) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ Meta AI failed to respond.");
        }

        // React: Success
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

        // Reply with AI message
        await reply(`💬 *Rahman Ai:* ${data.response}`);

    } catch (e) {
        console.error("MetaAI Error:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply("❌ An error occurred while talking to Meta AI.");
    }
});
