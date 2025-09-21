const { cmd } = require("../command");
const { getActivityList } = require("../lib/activity");

cmd(
  {
    pattern: "tagactive",
    alias: ["active"],
    desc: "Mentions the most active members in the group 📊",
    category: "group",
    filename: __filename,
  },
  async (conn, mek, m, { from, reply, isGroup }) => {
    try {
      if (!isGroup) return reply("🚫 *This command can only be used in groups!*");

      let activeList = getActivityList(from);
      if (activeList.length === 0) return reply("⚠️ *No activity recorded yet!*");

      let topActive = activeList.slice(0, 5); // Get top 5 active users
      let mentions = topActive.map((u) => `🔥 @${u.user.split("@")[0]} (${u.count} msgs)`).join("\n");

      let text = `📊 *Most Active Members:*\n\n${mentions}\n\n🏆 *Stay engaged!*`;

      return await conn.sendMessage(from, { text, mentions: topActive.map((u) => u.user) }, { quoted: mek });
    } catch (e) {
      console.log(e);
      return reply(`❌ *Error:* ${e}`);
    }
  }
);

cmd(
  {
    pattern: "topactive",
    alias: ["activelist"],
    desc: "Lists all group members with their message count 📋",
    category: "group",
    filename: __filename,
  },
  async (conn, mek, m, { from, reply, isGroup }) => {
    try {
      if (!isGroup) return reply("🚫 *This command can only be used in groups!*");

      let activityList = getActivityList(from);
      if (activityList.length === 0) return reply("⚠️ *No messages have been recorded yet!*");

      let list = activityList.map((u, i) => `🎀 *${i + 1}.* @${u.user.split("@")[0]} - ${u.count} msgs`).join("\n");

      let text = `📋 *Group Activity List:*\n\n${list}\n\n💬 *Keep chatting!*`;

      return await conn.sendMessage(from, { text, mentions: activityList.map((u) => u.user) }, { quoted: mek });
    } catch (e) {
      console.log(e);
      return reply(`❌ *Error:* ${e}`);
    }
  }
);
