const { cmd } = require("../command");
const fetch = require("node-fetch");
const yts = require("yt-search");


// 🎶 YouTube Audio Downloader 
cmd({
  'pattern': "play",
  'alias': ['song', "mp3"],
  'desc': "Download YouTube Audio",
  'category': 'downloader',
  'react': '💖',
  'filename': __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply("❌ Please provide a YouTube link or search query.\n\n✨ Example: *.play madine wale*");
    }

    let ytUrl, ytInfo;
    if (q.includes('youtube.com') || q.includes("youtu.be")) {
      ytUrl = q;
      ytInfo = (await yts({ videoId: ytUrl.split("v=")[1] || ytUrl.split("/").pop() })).videos[0];
    } else {
      let search = await yts(q);
      if (!search || !search.videos || search.videos.length === 0) {
        return reply("⚠️ No results found.");
      }
      ytInfo = search.videos[0];
      ytUrl = ytInfo.url;
    }

    let res = await fetch('https://gtech-api-xtp1.onrender.com/api/audio/yt?apikey=APIKEY&url=' + encodeURIComponent(ytUrl));
    let data = await res.json();

    if (!data.status) {
      return reply("🚫 Failed to fetch audio.");
    }

    let { audio_url } = data.result.media;

    // Stylish Caption
    let audioCaption = `
‎*╭━━━━━━━━━━━━━━━━━๏*
‎*┇*๏ *ᴛɪᴛʟᴇ:* ${ytInfo.title}
‎*┇*๏ *ᴀᴜᴛʜᴏʀ:* ${yts.author.name}
‎*┇*๏ *ᴅᴜʀᴀᴛɪᴏɴ:* ${yts.timestamp}
‎*┇*๏ *ᴠɪᴇᴡs:* ${ytInfo.views.toLocaleString()}
‎*┇*๏ *ᴜᴘʟᴏᴀᴅᴇᴅ:* ${ytInfo.ago}
‎*╰━━━━━━━━━━━━━━━━━๏*
*╭───────────────━┈⍟*
‎┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_* 
‎*╰───────────────━┈⍟*
    `;

    // Send Audio with Thumbnail + Caption
    await conn.sendMessage(from, {
      audio: { url: audio_url },
      mimetype: "audio/mpeg",
      ptt: false,
      caption: audioCaption,
      contextInfo: {
        externalAdReply: {
          title: ytInfo.title,
          body: ytInfo.author.name,
          mediaType: 2,
          thumbnailUrl: ytInfo.thumbnail,
          mediaUrl: ytUrl,
          sourceUrl: ytUrl
        }
      }
    }, { quoted: mek });

  } catch (e) {
    reply("❌ Error while fetching audio.");
    console.log(e);
  }
});


// 🎥 YouTube Video Downloader 
cmd({
  'pattern': 'video',
  'alias': ["vid", "ytv"],
  'desc': "Download YouTube Video",
  'category': 'downloader',
  'react': '🪄',
  'filename': __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply("❌ Please provide a YouTube link or search query.\n\n✨ Example: *.video Pasoori*");
    }

    let ytUrl, ytInfo;
    if (q.includes("youtube.com") || q.includes('youtu.be')) {
      ytUrl = q;
      ytInfo = (await yts({ videoId: ytUrl.split("v=")[1] || ytUrl.split("/").pop() })).videos[0];
    } else {
      let search = await yts(q);
      if (!search || !search.videos || search.videos.length === 0) {
        return reply("⚠️ No results found.");
      }
      ytInfo = search.videos[0];
      ytUrl = ytInfo.url;
    }

    let res = await fetch("https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=" + encodeURIComponent(ytUrl));
    let data = await res.json();

    if (!data.status) {
      return reply("🚫 Failed to fetch video.");
    }

    let { video_url_hd, video_url_sd } = data.result.media;
    let finalUrl = video_url_hd !== "No HD video URL available" ? video_url_hd : video_url_sd;

    if (!finalUrl || finalUrl.includes('No')) {
      return reply("⚠️ No downloadable video found.");
    }

    // Stylish Caption
    let videoCaption = `
‎*_ʀᴀʜᴍᴀɴ-ᴍᴅ ʏᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
‎*╭━━━━━━━━━━━━━━━━━๏*
‎*┇*🎬 *ᴛɪᴛʟᴇ:* ${ytInfo.title}
‎*┇*👤 *ᴀᴜᴛʜᴏʀ:* ${yts.author.name}
‎*┇*⏱️ *ᴅᴜʀᴀᴛɪᴏɴ:* ${yts.timestamp}
‎*┇*👁️ *ᴠɪᴇᴡs:* ${ytInfo.views.toLocaleString()}
‎*┇*📅 *ᴜᴘʟᴏᴀᴅᴇᴅ:* ${ytInfo.ago}
‎*╰━━━━━━━━━━━━━━━━━๏*
‎*╭────◉◉◉─────────៚*
‎*┋* *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_* 
‎*╰────◉◉◉─────────៚*
    `;

    //Thumbnail 
    await conn.sendMessage(from, {
      image: { url: ytInfo.thumbnail },
      caption: videoCaption
    }, { quoted: mek });

    // Video caption
    await conn.sendMessage(from, {
      video: { url: finalUrl },
      caption: videoCaption
    }, { quoted: mek });

  } catch (e) {
    reply("❌ Error while fetching video.");
    console.log(e);
  }
});