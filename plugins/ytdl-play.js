const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js'); 
const converter = require('../data/play-converter');
const fetch = require('node-fetch');

cmd({ 
    pattern: "play4", 
    alias: ["yta4"], 
    react: "☘️", 
    desc: "Download YouTube song via RAHMAN MD API", 
    category: "main", 
    use: '.play2 <query or youtube url>', 
    filename: __filename 
}, async (conn, mek, m, { from, sender, reply, q }) => { 
    try {
        if (!q) return reply("*Please provide a song name or YouTube link.*");

        let ytUrl = '';
        if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(q)) {
            ytUrl = q.trim();
        } else {
            const yt = await ytsearch(q);
            if (!yt.results.length) return reply("No results found!");
            ytUrl = yt.results[0].url;
        }

        const apiUrl = `https://api.princetechn.com/api/download/ytmp3?apikey=prince&url=${encodeURIComponent(ytUrl)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data?.result?.downloadUrl) return reply("❌ Download failed. Try again later.");

        await conn.sendMessage(from, {
            audio: { url: data.result.downloadUrl },
            mimetype: "audio/mpeg",
            fileName: `${data.result.title || 'song'}.mp3`
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply("An error occurred. Please try again.");
    }
});

cmd({ 
    pattern: "yta", 
    alias: ["play", "audio"], 
    react: "🎧", 
    desc: "Download YouTube song", 
    category: "main", 
    use: '.song <query>', 
    filename: __filename 
}, async (conn, mek, m, { from, sender, reply, q }) => { 
    try {
        if (!q) return reply("*Please provide a song name..*");

        const yt = await ytsearch(q);
        if (!yt.results.length) return reply("No results found!");

        const song = yt.results[0];
        const apiUrl = `https://api.princetechn.com/api/download/dlmp3?apikey=prince&url=${encodeURIComponent(song.url)}`;
        
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data?.result?.downloadUrl) return reply("Download failed. Try again later.");

        await conn.sendMessage(from, {
            audio: { url: data.result.downloadUrl },
            mimetype: "audio/mpeg",
            fileName: `${song.title}.mp3`
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply("An error occurred. Please try again.");
    }
});

cmd({
    pattern: "play2",
    alias: ["yta2", "song"],
    react: "🎵",
    desc: "Download high quality YouTube audio",
    category: "media",
    use: "<song name>",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Please provide a song name\nExample: .play2 Tum Hi Ho");

        await conn.sendMessage(from, { text: "🔍 Sᴇᴀʀᴄʜɪɴɢ ғᴏʀ ʏᴏᴜʀ sᴏɴɢ..." }, { quoted: mek });
        const yt = await ytsearch(q);
        if (!yt?.results?.length) return reply("❌ No results found. Try a different search term.");

        const vid = yt.results[0];

        const caption =
`‎*_ʏᴛ ᴀᴜᴅɪᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
‎*╭━━━━━━━━━━━━━━━━━━๏*
‎*┇*๏ *ᴛɪᴛʟᴇ:*    ${vid.title}
‎*┇*๏ *ᴅᴜʀᴀᴛɪᴏɴ:* ${vid.timestamp}
‎*┇*๏ *ᴠɪᴇᴡs:* ${vid.views}
‎*┇*๏ *ᴀᴜᴛʜᴏʀ:* ${vid.author.name}
‎*╰━━━━━━━━━━━━━━━━━━๏*
‎*╭────────────────━┈⍟*
‎┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_* 
‎*╰────────────────━┈⍟*`;

        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption
        }, { quoted: mek });

        const apiUrl = `https://apis.sandarux.sbs/api/ytmp3/ytdown?url=${encodeURIComponent(q)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data?.status || !data?.result?.downloadUrl) {
            return reply("❌ Failed to fetch audio. Try again later.");
        }

        await conn.sendMessage(from, {
            audio: { url: data.result.downloadUrl },
            mimetype: 'audio/mpeg',
            ptt: false,
            fileName: `${vid.title}.mp3`.replace(/[^\w\s.-]/gi, '')
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (error) {
        console.error('Play2 command error:', error);
        reply("⚠️ An unexpected error occurred. Please try again.");
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    }
});
 
cmd({ 
    pattern: "play3", 
    alias: ["jadu", "music", "dlyt", "playx"], 
    react: "❄️", 
    desc: "Download YouTube content with options",
    category: "download", 
    use: '.play2 <Youtube URL or Name>', 
    filename: __filename }, 
    async (conn, mek, m, { from, q, reply }) => { 
        try {
            if (!q) return await reply("Please provide a YouTube URL or video name.");

            const yt = await ytsearch(q);
            if (yt.results.length < 1) return reply("No results found!");
            
            let yts = yt.results[0];  
            
            let ytmsg = `*_‎ʀᴀʜᴍᴀɴ-ᴍᴅ ʏᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
‎*╭━━━━━━━━━━━━━━━━━━๏*
‎*┇*๏ *ᴛɪᴛʟᴇ:* ${yts.title}
‎*┇*๏ *ᴅᴜʀᴀᴛɪᴏɴ:* ${yts.timestamp}
‎*┇*๏ *ᴠɪᴇᴡs:* ${yts.views}
‎*┇*๏ *ᴀᴜᴛʜᴏʀ:* ${yts.author.name}
‎*╰━━━━━━━━━━━━━━━━━━๏*

‎🔢 *ʀᴇᴘʟʏ ᴡɪᴛʜ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ*
*‎1 ║❯❯ ᴠɪᴅᴇᴏ ϙᴜᴀʟɪᴛʏ 📽️*
*‎2 ║❯❯ ᴀᴜᴅɪᴏ ϙᴜᴀʟɪᴛʏ 🎵*
*‎3 ║❯❯ ᴠᴏɪᴄᴇ ɴᴏᴛᴇ 🎙️*
*‎4 ║❯❯ ᴅᴏᴄᴜᴍᴇɴᴛ (ᴍᴘ4) 📁*
*‎5 ║❯❯ ᴅᴏᴄᴜᴍᴇɴᴛ (ᴍᴘ3) 📃*‎`;

            const sentMsg = await conn.sendMessage(from, { 
                image: { url: yts.thumbnail }, 
                caption: ytmsg 
            }, { quoted: mek });

            const messageID = sentMsg.key.id;
            let responded = false;

            const replyHandler = async (msgData) => {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg.message || responded) return;

                const receivedText = receivedMsg.message.conversation || 
                                    receivedMsg.message.extendedTextMessage?.text;
                const senderID = receivedMsg.key.remoteJid;
                const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

                if (isReplyToBot && senderID === from) {
                    if (!['1','2','3','4','5'].includes(receivedText)) {
                        await conn.sendMessage(from, { 
                            text: "❌ Invalid option! Please reply with 1, 2, 3, 4, or 5." 
                        }, { quoted: receivedMsg });
                        return;
                    }

                    responded = true;
                    conn.ev.off("messages.upsert", replyHandler);

                    await conn.sendMessage(from, {
                        react: { text: '⬇️', key: receivedMsg.key }
                    });

                    try {
                        const apiResponse = await fetch(`https://apis.sandarux.sbs/api/download/ytmp4?url=${encodeURIComponent(yts.title)}`);
                        const apiData = await apiResponse.json();
                        
                        if (!apiData.status || !apiData.result?.downloadUrl) {
                            throw new Error("Failed to get download URL");
                        }

                        const downloadUrl = apiData.result.downloadUrl;
                        const sanitizedTitle = yts.title.replace(/[^\w\s]/gi, '').substring(0, 50);

                        const mediaRes = await fetch(downloadUrl);
                        const mediaBuffer = await mediaRes.buffer();

                        switch (receivedText) {
                            case "1":
                                await conn.sendMessage(from, { 
                                    video: mediaBuffer,
                                    caption: "> *Powɘʀɘɗ ɓƴ Rʌʜɱʌŋ-ɱɗ*"
                                }, { quoted: receivedMsg });
                                break;
                                
                            case "2":
                                await conn.sendMessage(from, { 
                                    audio: mediaBuffer,
                                    mimetype: "audio/mpeg",
                                    fileName: `${sanitizedTitle}.mp3`
                                }, { quoted: receivedMsg });
                                break;
                                
                            case "3":
                                await conn.sendMessage(from, { 
                                    audio: mediaBuffer,
                                    mimetype: "audio/ogg; codecs=opus",
                                    ptt: true,
                                    fileName: `${sanitizedTitle}.opus`
                                }, { quoted: receivedMsg });
                                break;
                                
                            case "4":
                                await conn.sendMessage(from, { 
                                    document: mediaBuffer,
                                    mimetype: "video/mp4",
                                    fileName: `${sanitizedTitle}.mp4`
                                }, { quoted: receivedMsg });
                                break;
                                
                            case "5":
                                await conn.sendMessage(from, { 
                                    document: mediaBuffer,
                                    mimetype: "audio/mpeg",
                                    fileName: `${sanitizedTitle}.mp3`
                                }, { quoted: receivedMsg });
                                break;
                        }
                    } catch (error) {
                        console.error("Download error:", error);
                        await conn.sendMessage(from, { 
                            text: "❌ Failed to download. Please try again later." 
                        }, { quoted: receivedMsg });
                    }
                }
            };

            conn.ev.on("messages.upsert", replyHandler);

            setTimeout(() => {
                if (!responded) {
                    conn.ev.off("messages.upsert", replyHandler);
                }
            }, 60000);

        } catch (e) {
            console.log(e);
            reply("An error occurred. Please try again later.");
        }
    }
);
