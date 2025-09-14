const { cmd } = require('../command');

// 📢 Channel Command
cmd({
    pattern: "channel",
    desc: "Get the link to the official WhatsApp channel.",
    react: "📢",
    category: "utility",
    use: ".channel",
}, async (conn, mek, m) => {
    try {
        const channelLink = "https://whatsapp.com/channel/0029VaEV2x85kg7Eid9iK43R";

        await conn.sendMessage(m.chat, {
            text: `╭━━━〔 📢 𝑶𝒇𝒇𝒊𝒄𝒊𝒂𝒍 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 〕━━━╮

✨ 𝑺𝒕𝒂𝒚 𝒄𝒐𝒏𝒏𝒆𝒄𝒕𝒆𝒅 𝒘𝒊𝒕𝒉 *𝑹𝑨𝑯𝑴𝑨𝑵-𝑴𝑫*  
𝒇𝒐𝒓 𝒍𝒂𝒕𝒆𝒔𝒕 𝒖𝒑𝒅𝒂𝒕𝒆𝒔 & 𝒏𝒆𝒘𝒔!  

🔗 𝐂𝐥𝐢𝐜𝐤 𝐡𝐞𝐫𝐞:  
${channelLink}

✅ 𝑱𝒐𝒊𝒏 𝒏𝒐𝒘 & 𝒔𝒕𝒂𝒚 𝒖𝒑𝒅𝒂𝒕𝒆𝒅!
╰━━━━━━━━━━━━━━━━━━━━╯`
        }, { quoted: mek });
    } catch (error) {
        console.error("Error sending channel link:", error.message);
        await m.reply("❌ Sorry, an error occurred while trying to send the channel link.");
    }
});

// 🛠️ Support Command
cmd({
    pattern: "support",
    desc: "Get the link to the support group or page.",
    react: "🛠️",
    category: "utility",
    use: ".support",
}, async (conn, mek, m) => {
    try {
        const supportLink = "https://chat.whatsapp.com/JvaJHe9m6N6CMWqTRSAcbp?mode=r_t";

        await conn.sendMessage(m.chat, {
            text: `╭━━〔 🛠️ 𝑶𝒇𝒇𝒊𝒄𝒊𝒂𝒍 𝑺𝒖𝒑𝒑𝒐𝒓𝒕 〕━━╮

✨ 𝑮𝒆𝒕 𝒉𝒆𝒍𝒑 & 𝒔𝒖𝒑𝒑𝒐𝒓𝒕 𝒇𝒐𝒓 *𝑹𝑨𝑯𝑴𝑨𝑵-𝑴𝑫*!  

🔗 𝐂𝐥𝐢𝐜𝐤 𝐡𝐞𝐫𝐞:  
${supportLink}

✅ 𝑱𝒐𝒊𝒏 𝒏𝒐𝒘 & 𝒈𝒆𝒕 𝒔𝒖𝒑𝒑𝒐𝒓𝒕!
╰━━━━━━━━━━━━━━━━━━━━╯`
        }, { quoted: mek });
    } catch (error) {
        console.error("Error sending support link:", error.message);
        await m.reply("❌ Sorry, an error occurred while trying to send the support link.");
    }
});
