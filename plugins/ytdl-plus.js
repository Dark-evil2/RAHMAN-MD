const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "songx",
  alias: ["ytmp4"],
  desc: "Download YouTube video (MP4)",
  category: "main",
  use: ".songx <video name>",
  react: "🔰",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("❗ Please provide a video/song name.");

    // ⏳ Processing reaction
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const url = `https://gtech-api-xtp1.onrender.com/api/video/yt?apikey=APIKEY&url=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.status || !data.result?.video?.download_url) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply("❌ No video found or API error.");
    }

    const video = data.result;

    await conn.sendMessage(from, {
      video: { url: video.video.download_url },
      mimetype: "video/mp4",
      caption: `📽️ *${video.title}*\n⏳ ${video.duration}\n👁️ ${video.views} views\n🗓️ Published: ${video.published}`
    }, { quoted: mek });

    // ✅ Success reaction
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    reply("⚠️ Error occurred. Try again.");
  }
});

cmd({
  pattern: "play",
  alias: ["ytmp3"],
  desc: "Download YouTube song (MP3)",
  category: "main",
  use: ".playx <song name>",
  react: "🔰",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("❗ Please provide a song name.");

    // ⏳ Processing reaction
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const url = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.status || !data.result?.download_url) {
      await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
      return reply("❌ No audio found or API error.");
    }

    const song = data.result;

    await conn.sendMessage(from, {
      audio: { url: song.download_url },
      mimetype: "audio/mpeg",
      fileName: `${song.title}.mp3`
    }, { quoted: mek });

    await reply(`‎*_ʀᴀʜᴍᴀɴ-ᴍᴅ ʏᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
‎*╭───────────────━┈⍟*
‎  ᴛɪᴛʟᴇ: ${song.title}*
‎
‎*╰───────────────━┈⍟*
‎*╭────◉◉◉─────────៚*
‎*┋* *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_* 
‎*╰────◉◉◉─────────៚*`);

    // ✅ Success reaction
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    reply("⚠️ Error occurred. Try again.");
  }
});
