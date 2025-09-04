const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "tiny",
    alias: ['short', 'shorturl'],
    react: "🫧",
    desc: "Create a flashy tiny URL!",
    category: "convert",
    use: "<url>",
    filename: __filename,
},
async (conn, mek, m, { args, reply }) => {
    if (!args[0]) {
        return reply("❗ *Oops!* You forgot to provide a link.\n\n📌 Usage: `.tiny <url>`");
    }

    try {
        const link = args[0];

        // David Cyril Tech API call
        const response = await axios.get(`https://apis.davidcyriltech.my.id/tinyurl?url=${encodeURIComponent(link)}`);
        const shortenedUrl = response.data.url || response.data;

        // Flashy one-line card style
        const message = `✨ *ʏᴏᴜʀ ᴛɪɴʏ ᴜʀʟ ɪs ʀᴇᴀᴅʏ!* ✨\n\n🔗 [ᴄʟɪᴄᴋ ʜᴇʀᴇ](${shortenedUrl})\n\n💡 ᴏʀɪɢɪɴᴀʟ: ${link}`;

        return reply(message);
    } catch (e) {
        console.error("Error shortening URL:", e);
        return reply("❌ *Error!* Couldn't shorten your URL. Check the link or try again.");
    }
});