const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    SESSION_ID: process.env.SESSION_ID || "RAHMAN-MD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUh2dzU3M0ZWNEE1ODl1eHpRekRURmNzVEtYYWtoT21OWUdneEpKZjYzST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0R3QVFjUm9FbDMwNzZIeUFWNFhBbjF1ZFduc2E0QlFjeVZNNCtIY0RGRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLRXRLbmxKSS9ESkRldkp1Qkw3dzNhMmlpV21mYm1JY2lVRnpVYXQzUkVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrU2ZtUnd5RkZOQmYzSUFRWXI0L0lWaVluaGVpU1BJd1NqaFBwS3IvL1Q0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitJNVhySDE0YnYxMzU4WUtNZnAyK1E1WTNwTkoyMWM2Qk5XZ21WME1qMWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNwbE5PbVFwUXlSelpGbWtnV2dZckprV2NQdWU3cDV0TjFha2VTaXk5bU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU9yaUVLaDNxLzRDZkU4c1dJcnR5UnNxY1RxYjJjbVFFeUllMUwydzlsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHJmKy9KOTFGdWF5Q1o3ZlJnL01BTzBiU0dIcnQ5Q3N5Q3hMTVJJTEhnOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikp2ZW9iNElsblJtbkI0VXhCdmtzSm94ZG1LL0RFV3Q2S2RRQnZodUUvN1hIRTB6S09jcnQwdjY5NWFMZkh1K3FVd2tyZTZENE1GNnFkVkIxWWNuWmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA2LCJhZHZTZWNyZXRLZXkiOiJWdk1EQ2JsQW4rck54ZjBsTWFnZ3FRSElObWJCcGpPN1p4WHkyejU4eXlRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzMxOTcwOTc4MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQzAwMkYwQkFERTY3MDFFNEM5N0Y2Q0Q2RDQ3RERDNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU4OTgzMzU1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMzMTk3MDk3ODFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUM0OTU3QkJBNENFNTRDNkQ2ODMzRTIyOUQ1REE2NUIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1ODk4MzM1Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiM1BKRFdKNUQiLCJtZSI6eyJpZCI6IjkyMzMxOTcwOTc4MTo4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjMwMjk2NDE0ODY3NjQ3OjhAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNVE14TW9ERUxicDM4WUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZNHI4c3ZiYVg0empSWk94RlJkb1NSejRGZXdGT3ZRbUpnSzVQbTNUcGprPSIsImFjY291bnRTaWduYXR1cmUiOiJqSG9NS0hyRUYxRVB6ZGdMalIyaWFzK2lqUkRvRmRZZzNCcmFSRlN6NlhTejVxM2MySE0vTUNUZTF0SGtBVzhhcVBFOGNFckdiN2dFYmQxYS80cjREUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiS3RSbEtKeSs0VXlpS3hLSW9JUFhwVEt5TTVRdEdLS3c2d3ZvV0pSV3p3VURRSHAwRWlZd1NUemYzbFl1Tk9PQWZrZkhGNkFZYmMrdzk2YlpzSUdBaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMzMTk3MDk3ODE6OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXT0svTEwyMmwrTTQwV1RzUlVYYUVrYytCWHNCVHIwSmlZQ3VUNXQwNlk1In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTg5ODMzNTMsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSFZYIn0=",  // Your bot's session ID (keep it secure)
    PREFIX: getConfig("PREFIX") || ".",  // Command prefix (e.g., "., / ! * - +")
    CHATBOT: getConfig("CHATBOT") || "on", // on/off chat bot 
    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "𝐑𝐀𝐇𝐌𝐀𝐍-𝐌𝐃",  // Bot's display name
    MODE: getConfig("MODE") || process.env.MODE || "public",        // Bot mode: public/private/group/inbox
    REPO: process.env.REPO || "https://github.com/RAHMAN-TECH90/RAHMAN-MD",  // Bot's GitHub repo
    BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",  // Bot's BAILEYS

    // ===== OWNER & DEVELOPER SETTINGS =====
    OWNER_NUMBER: process.env.OWNER_NUMBER || "923015954782",  // Owner's WhatsApp number
    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "‎Rαԋɱαɳ υʅʅαԋ",           // Owner's name
    DEV: process.env.DEV || "923015954782",                     // Developer's contact number
    DEVELOPER_NUMBER: '923015954782@s.whatsapp.net',            // Developer's WhatsApp ID

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",              // Enable/disable auto-reply
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",// Reply to status updates?
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*ʀᴀʜᴍᴀɴ ᴍᴅ ᴠɪᴇᴡᴇᴅ ʏᴏᴜʀ sᴛᴀᴛᴜs 🤖*",  // Status reply message
    READ_MESSAGE: process.env.READ_MESSAGE || "false",          // Mark messages as read automatically?
    REJECT_MSG: process.env.REJECT_MSG || "*📞 ᴄαℓℓ ɴσт αℓℓσωє∂ ιɴ тнιѕ ɴᴜмвєʀ уσυ ∂σɴт нανє ᴘєʀмιѕѕισɴ 📵*",
    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",              // Auto-react to messages?
    OWNER_REACT: process.env.OWNER_REACT || "false",              // Auto-react to messages?
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",          // Use custom emoji reactions?
    CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",  // set custom reacts
    STICKER_NAME: process.env.STICKER_NAME || "𝐑𝐀𝐇𝐌𝐀𝐍-𝐌𝐃",     // Sticker pack name
    AUTO_STICKER: process.env.AUTO_STICKER || "false",          // Auto-send stickers?
    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "true",      // Auto-record voice notes?
    AUTO_TYPING: process.env.AUTO_TYPING || "false",            // Show typing indicator?
    MENTION_REPLY: process.env.MENTION_REPLY || "false",   // reply on mentioned message 
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://files.catbox.moe/84jssf.jpg",  // Bot's "alive" menu mention image

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true", // true antidelete to recover deleted messages 
    ANTI_CALL: process.env.ANTI_CALL || "false", // enble to reject calls automatically 
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "true",    // Block bad words?
    ANTI_LINK: process.env.ANTI_LINK || "true",    // Block links in groups
    ANTI_VV: process.env.ANTI_VV || "true",   // Block view-once messages
    DELETE_LINKS: process.env.DELETE_LINKS || "false",          // Auto-delete links?
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same", // inbox deleted messages (or 'same' to resend)
    ANTI_BOT: process.env.ANTI_BOT || "true",
    PM_BLOCKER: process.env.PM_BLOCKER || "true",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    DESCRIPTION: process.env.DESCRIPTION || "*_© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴛᴇᴄʜ_*",  // Bot description
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",              // Allow public commands?
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",        // Show bot as always online?
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true", // React to status updates?
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true", // VIEW to status updates?
    AUTO_BIO: process.env.AUTO_BIO || "false", // ture to get auto bio 
    WELCOME: process.env.WELCOME || "true", // true to get welcome in groups 
    GOODBYE: process.env.GOODBYE || "false", // true to get goodbye in groups 
    ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // true if want see admin activity 
};
        
