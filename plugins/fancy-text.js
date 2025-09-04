const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fancy",
  alias: ["font", "style"],
  react: "✍️",
  desc: "Convert text into various fonts.",
  category: "tools",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply }) => {
  try {
    if (!q) {
      return reply("❎ Please provide text to convert into fancy fonts.\n\n*Example:* .fancy Hello");
    }

    // APIs
    const apis = [
      `https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(q)}`,
      `https://api.nexoracle.com/fancyfont?text=${encodeURIComponent(q)}`,
      `https://vihangayt.me/tools/fancy?text=${encodeURIComponent(q)}`
    ];

    let data;
    for (let api of apis) {
      try {
        const res = await axios.get(api);
        if (res.data && res.data.result && Array.isArray(res.data.result)) {
          data = res.data;
          break;
        }
      } catch (e) {
        console.log(`⚠️ API failed: ${api}`);
      }
    }

    if (!data) {
      return reply("❌ All APIs failed. Please try again later.");
    }

    // Format fancy fonts
    let fonts = "";
    data.result.forEach((item, index) => {
      fonts += `*${index + 1}. ${item.name || "Style"}*\n${item.result}\n\n`;
    });

    const resultText = `✨ *𝐅𝐀𝐍𝐂𝐘 𝐅𝐎𝐍𝐓 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑* ✨\n\n${fonts}\n> 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐑𝐚𝐡𝐦𝐚𝐧-𝐓𝐞𝐜𝐡`;

    await conn.sendMessage(from, { text: resultText }, { quoted: m });

  } catch (error) {
    console.error("❌ Error in fancy command:", error.message || error);
    reply("⚠️ An error occurred while fetching fonts.");
  }
});