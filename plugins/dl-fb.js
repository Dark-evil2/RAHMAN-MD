const axios = require("axios");
const { cmd } = require("../command");

// Facebook Downloader Prince 
cmd({
  pattern: "fb4",
  alias: ["facebook4", "fbdl4"],
  react: '📥',
  desc: "Download videos from Facebook (PRINCE API)",
  category: "download",
  use: ".fb <Facebook video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const fbUrl = args[0];
    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply('❌ Please provide a valid Facebook video URL.\nExample: `.fb https://facebook.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://api.princetechn.com/api/download/facebook?apikey=prince&url=${encodeURIComponent(fbUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.result || !response.data.result[0]) {
      return reply('❌ Unable to fetch the video.');
    }

    const downloadLink = response.data.result[0].url;

    await conn.sendMessage(from, {
      video: { url: downloadLink },
      caption: `*╭───────────────━┈⍟*
┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*
*╰───────────────━┈⍟*`
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (e) {
    console.error(e);
    reply('❌ Error: Unable to download.');
  }
});

// Facebook Downloader 
cmd({
  pattern: "fb2",
  alias: ["facebook2", "fbvideo2"],
  react: '📥',
  desc: "Download videos from Facebook",
  category: "download",
  use: ".fb2 <Facebook video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const fbUrl = args[0];
    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply('❌ Please provide a valid Facebook video URL.\nExample: `.fb2 https://facebook.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(fbUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.result || !response.data.result[0]) {
      return reply('❌ Unable to fetch the video.');
    }

    const downloadLink = response.data.result[0].url;

    await conn.sendMessage(from, {
      video: { url: downloadLink },
      caption: `*╭───────────────━┈⍟*
┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*
*╰───────────────━┈⍟*`
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (e) {
    console.error(e);
    reply('❌ Error: Unable to download.');
  }
});

// Facebook Downloader 
cmd({
  pattern: "fb3",
  alias: ["facebook3"],
  react: '📥',
  desc: "Download videos from Facebook",
  category: "download",
  use: ".fb3 <Facebook video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const fbUrl = args[0];
    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply('❌ Please provide a valid Facebook video URL.\nExample: `.fb3 https://facebook.com/...`');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://gtech-api-xtp1.onrender.com/api/dl/facebook?apikey=APIKEY&url=${encodeURIComponent(fbUrl)}&apikey=your_api_key_here`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.results || !response.data.results.download) {
      return reply('❌ Unable to fetch the video.');
    }

    const downloadLink = response.data.results.download.hdVideos?.videoUrl || response.data.results.download.sdVideos.videoUrl;

    await conn.sendMessage(from, {
      video: { url: downloadLink },
      caption: `*╭───────────────━┈⍟*
┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*
*╰───────────────━┈⍟*`
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (e) {
    console.error(e);
    reply('❌ Error: Unable to download.');
  }
});
