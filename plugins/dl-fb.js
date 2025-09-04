const axios = require("axios");
const { cmd } = require("../command");

// Facebook Downloader v1 (Nexoracle API v1)
cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  react: '📥',
  desc: "Download videos from Facebook (Nexoracle API v1)",
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

    const apiUrl = `https://api.nexoracle.com/downloader/facebook?apikey=58b3609c238b2b6bb6&url=${encodeURIComponent(fbUrl)}`;
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

// Facebook Downloader v2 (Nexoracle API v2)
cmd({
  pattern: "fb2",
  alias: ["facebook2", "fbvideo2"],
  react: '📥',
  desc: "Download videos from Facebook (Nexoracle API v2)",
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

    const apiUrl = `https://api.nexoracle.com/downloader/facebook2?apikey=58b3609c238b2b6bb6&url=${encodeURIComponent(fbUrl)}`;
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

// Facebook Downloader v3 (DavidCyril API)
cmd({
  pattern: "fb3",
  alias: ["facebook3"],
  react: '📥',
  desc: "Download videos from Facebook (DavidCyril API)",
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

    const apiUrl = `https://apis.davidcyriltech.my.id/facebook3?url=${encodeURIComponent(fbUrl)}&apikey=your_api_key_here`;
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