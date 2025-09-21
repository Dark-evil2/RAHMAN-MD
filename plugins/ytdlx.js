const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');

// MP4 video download

cmd({ 
    pattern: "mp45", 
    alias: ["video5"], 
    react: "🎦", 
    desc: "Download YouTube video", 
    category: "main", 
    use: '.mp4 < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or video name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }

        let ytmsg = `‎*_ʀᴀʜᴍᴀɴ-ᴍᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
‎╭────────────────━┈⊷
‎│▸ℹ️ *ᴛɪᴛʟᴇ:* ${yts.title}
‎│▸🕘 *ᴅᴜʀᴀᴛɪᴏɴ:* ${ytInfo.timestamp}
‎│▸👁️‍🗨️ *ᴠɪᴇᴡs:* ${yts.views}
‎│▸👤 *ᴀᴜᴛʜᴏʀ:* ${ytInfo.author.name}
‎│▸🔗 *Lɪɴᴋ:* ${yts.url}
‎╰────────────────━┈⊷
‎╭────────────────━┈⍟
‎┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴛᴇᴄʜ_* 
‎╰────────────────━┈⍟`;

        // Send video directly with caption
        await conn.sendMessage(
            from, 
            { 
                video: { url: data.result.download_url }, 
                caption: ytmsg,
                mimetype: "video/mp4"
            }, 
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});

