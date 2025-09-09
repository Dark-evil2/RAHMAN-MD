const config = require('../config');
const { cmd } = require('../command');
const fetch = require("node-fetch");
const { ytsearch } = require('@dark-yasiya/yt-dl.js'); 

// 🎬 YouTube Video Downloader (song) 
cmd({
    pattern: "song4",
    alias: ["video2", "ytv2"],
    react: "🎬",
    desc: "Download YouTube video",
    category: "downloader",
    use: ".song <query/url>",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("🎬 Please provide video name/URL");
        
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        const yt = await ytsearch(q);
        if (!yt?.results?.length) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("No results found");
        }
        
        const vid = yt.results[0];
        const apiKey = config.API_KEY || "58b3609c238b2b6bb6";
        const api = `https://api.nexoracle.com/downloader/yt-video2?apikey=${apiKey}&url=${encodeURIComponent(vid.url)}`;
        
        const res = await fetch(api);
        const json = await res.json();
        
        if (!json?.status || !json.result?.url) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("Download failed");
        }
        
        const caption = `
╭─〔*ʀᴀʜᴍᴀɴ-ᴍᴅ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*〕
├─▸ *📌 ᴛɪᴛʟᴇ:* ${vid.title}
├─▸ *⏳ ᴅᴜʀᴀᴛɪᴏɴ:* ${vid.timestamp}
├─▸ *👀 ᴠɪᴇᴡs:* ${vid.views}
├─▸ *👤 ᴀᴜᴛʜᴏʀ:* ${vid.author.name}
╰──➤ *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ*`;

        await conn.sendMessage(from, {
            video: { url: json.result.url },
            caption: caption
        }, { quoted: mek });
        
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply("Error occurred");
    }
});

// 🎥 YouTube Video Downloader 
cmd({ 
    pattern: "video", 
    alias: ["song", "ytv"], 
    react: "🎥", 
    desc: "Download YouTube video (DavidCyrilTech API)", 
    category: "main", 
    use: ".video <query/url>", 
    filename: __filename 
}, async (conn, mek, m, { from, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (!yt.results.length) return reply("No results found!");
        
        const yts = yt.results[0];
        // 🔑 Fixed API (DavidCyrilTech)
        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data.status || !data.result?.url) {
            return reply("Failed to fetch the video. Please try again later.");
        }
        
        const ytmsg = 
`‎*_ʏᴛ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
‎*╭━━━━━━━━━━━━━━━━━━๏*
‎*┇*๏ *ᴛɪᴛʟᴇ:* ${yts.title}
‎*┇*๏ *ᴅᴜʀᴀᴛɪᴏɴ:* ${yts.timestamp}
‎*┇*๏ *ᴠɪᴇᴡs:* ${yts.views}
‎*┇*๏ *ᴀᴜᴛʜᴏʀ:* ${yts.author.name}
‎*╰━━━━━━━━━━━━━━━━━━๏*
‎*╭────────────────━┈⍟*
‎┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_* 
‎*╰────────────────━┈⍟*`;

        // Send details
        await conn.sendMessage(from, { image: { url: yts.thumbnail }, caption: ytmsg }, { quoted: mek });
        
        // Send video
        await conn.sendMessage(from, { video: { url: data.result.url }, mimetype: "video/mp4" }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});