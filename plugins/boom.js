const { cmd } = require('../command');

cmd({
  pattern: "boom",
  desc: "Repeat message",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply("Please provide the number of times to repeat");

    const input = q.split("/");
    const message = input[0].trim();
    const count = parseInt(input[1].trim());

    if (!count || !message) return reply("Invalid format. Use .boom <message> / <count>");

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(mek.chat, { text: message });
    }
  } catch (error) {
    console.log(error);
    return reply("An error occurred while repeating message");
  }
});
