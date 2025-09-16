const config = require('../config')
const { cmd } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "unmute",
    alias: ["groupunmute"],
    react: "🔊",
    desc: "Unmute the group (Everyone can send messages).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");

        // ✅ Check: Admin OR Developer
        const isDev = senderNumber === config.OWNER_NUMBER || senderNumber === config.DEV;
        if (!isAdmins && !isDev) return reply("❌ Only group admins or developer can use this command.");

        if (!isBotAdmins) return reply("❌ I need to be an admin to unmute the group.");

        await conn.groupSettingUpdate(from, "not_announcement");
        reply("✅ gяσυρ нαs вεεη υηмυтε∂. εvεяүσηε cαη sεη∂ мεssαgεs 🔓");
    } catch (e) {
        console.error("Error unmuting group:", e);
        reply("❌ Failed to unmute the group. Please try again.");
    }
});
