const config = require('../config')
const { cmd } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "mute",
    alias: ["groupmute"],
    react: "🔇",
    desc: "Mute the group (Only admins can send messages).",
    category: "group",
    filename: __filename
},             
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");

        // ✅ Check: Admin OR Developer
        const isDev = senderNumber === config.OWNER_NUMBER || senderNumber === config.DEV;
        if (!isAdmins && !isDev) return reply("❌ Only group admins or developer can use this command.");

        if (!isBotAdmins) return reply("❌ I need to be an admin to mute the group.");

        await conn.groupSettingUpdate(from, "announcement");
        reply("✅ gяσυρ нαs вεεη мυтε∂. σηℓү α∂мιηs cαη sεη∂ мεssαgεs 🔒");
    } catch (e) {
        console.error("Error muting group:", e);
        reply("❌ Failed to mute the group. Please try again.");
    }
});
