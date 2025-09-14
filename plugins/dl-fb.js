const axios = require("axios");
const { cmd } = require("../command");

// 📥 Facebook Downloader (Auto fallback with 5 APIs)
cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl", "fbvideo"],
  react: '📥',
  desc: "Download Facebook videos fallback",
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

    let downloadLink;

    // 1️⃣ sandarux API
    try {
      const dcApi = `https://apis.sandarux.sbs/api/fbnew/facebook?url=${encodeURIComponent(fbUrl)}`;
      const { data } = await axios.get(dcApi);
      if (data?.result?.hd || data?.result?.sd) {
        downloadLink = data.result.hd || data.result.sd;
      }
    } catch (e) {
      console.log("Sandarux API failed, trying Nexoracle v1...");
    }

    // 2️⃣ Nexoracle v1
    if (!downloadLink) {
      try {
        const nxApi1 = `https://api.nexoracle.com/downloader/facebook?apikey=58b3609c238b2b6bb6&url=${encodeURIComponent(fbUrl)}`;
        const { data } = await axios.get(nxApi1);
        if (data?.result?.[0]?.url) {
          downloadLink = data.result[0].url;
        }
      } catch (e) {
        console.log("Nexoracle v1 failed, trying v2...");
      }
    }

    // 3️⃣ Nexoracle v2
    if (!downloadLink) {
      try {
        const nxApi2 = `https://api.nexoracle.com/downloader/facebook2?apikey=58b3609c238b2b6bb6&url=${encodeURIComponent(fbUrl)}`;
        const { data } = await axios.get(nxApi2);
        if (data?.result?.[0]?.url) {
          downloadLink = data.result[0].url;
        }
      } catch (e) {
        console.log("Nexoracle v2 failed, trying PrinceTechn v2...");
      }
    }

    // 4️⃣ PrinceTechn v2
    if (!downloadLink) {
      try {
        const ptApi2 = `https://api.princetechn.com/api/download/facebookv2?apikey=prince&url=${encodeURIComponent(fbUrl)}`;
        const { data } = await axios.get(ptApi2);
        if (data?.result?.hd || data?.result?.sd) {
          downloadLink = data.result.hd || data.result.sd;
        }
      } catch (e) {
        console.log("PrinceTechn v2 failed, trying v1...");
      }
    }

    // 5️⃣ PrinceTechn v1
    if (!downloadLink) {
      try {
        const ptApi1 = `https://api.princetechn.com/api/download/facebook?apikey=prince&url=${encodeURIComponent(fbUrl)}`;
        const { data } = await axios.get(ptApi1);
        if (data?.result?.hd || data?.result?.sd) {
          downloadLink = data.result.hd || data.result.sd;
        }
      } catch (e) {
        console.log("PrinceTechn v1 failed.");
      }
    }

    // ❌ Agar sab fail ho jaye
    if (!downloadLink) {
      return reply("❌ Unable to fetch the video from all APIs.");
    }

    // ✅ Send video
    await conn.sendMessage(from, {
      video: { url: downloadLink },
      caption: `*╭───────────────━┈⍟*
┋ *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*
*╰───────────────━┈⍟*`
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error(e);
    reply("❌ Error: Unable to download.");
  }
});
