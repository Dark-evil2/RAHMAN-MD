const { cmd } = require("../command");
const fetch = require("node-fetch");

cmd({
  pattern: 'gitclone',
  alias: ["git"],
  desc: "Download GitHub repository as a zip file.",
  react: '📦',
  category: "downloader",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, reply }) => {

  if (!args[0]) return reply("❌ *GitHub link missing!* \nExample:\n.gitclone https://github.com/username/repository");
  if (!/^(https:\/\/)?github\.com\/.+/.test(args[0])) return reply("⚠️ *Invalid GitHub link!*");

  try {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
    const match = args[0].match(regex);
    if (!match) throw new Error("Invalid GitHub URL.");

    const [, username, repo] = match;
    const zipUrl = `https://api.github.com/repos/${username}/${repo}/zipball`;

    const response = await fetch(zipUrl, { method: "HEAD" });
    if (!response.ok) throw new Error("Repository not found.");

    const contentDisposition = response.headers.get("content-disposition");
    const fileName = contentDisposition ? contentDisposition.match(/filename=(.*)/)[1] : `${repo}.zip`;

    // Ultra-classy, concise, stylish caption
    const stylishCaption = `
*╭─❖ɢɪᴛʜᴜʙ ʀᴇᴘᴏ ᴅᴏᴡɴʟᴏᴀᴅ❖─╮*
*│ 📦 ʀᴇᴘᴏ:* ${username}/${repo}
*│ 🗂 ғɪʟᴇ:* ${fileName}
*│ 🔗 ʟɪɴᴋ:* ${args[0]}
*╰─────────❖────────╯*
  𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐑𝐀𝐇𝐌𝐀𝐍-𝐌𝐃 
`;

    reply(stylishCaption);

    await conn.sendMessage(from, {
      document: { url: zipUrl },
      fileName: fileName,
      mimetype: 'application/zip',
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363201214007503@newsletter',
          newsletterName: '‎𝐑𝐀𝐇𝐌𝐀𝐍-𝐓𝐄𝐂𝐇',
          serverMessageId: 143
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ Repository download failed. Please try again.");
  }

});
