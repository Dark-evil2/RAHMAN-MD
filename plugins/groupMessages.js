const { cmd } = require('../command');
const { loadSettings, saveSettings } = require('../lib/groupMessagesStorage');

// Load persistent settings.
let settings = loadSettings();
let welcomeSettings = settings.welcome || {};   // { groupJid: { enabled: true/false, message: "custom text" } }
let goodbyeSettings = settings.goodbye || {};   // { groupJid: { enabled: true/false, message: "custom text" } }

// Default messages
const defaultWelcomeMessage = "╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──┄──*\n*│  ̇─̣─̇─̣〘 ωєℓ¢σмє 〙̣─̇─̣─̇*\n*├┅┅┅┅┈┈┈┈┈┈┈┈┈┈┈┅┅┅◆*\n*│❀ нєу* @user\n*│❀ gʀσᴜᴘ* @group!\n*├┅┅┅┅┈┈┈┈┈┈┈┈┈┅┅┅◆*\n*│● ѕтαу ѕαfє αɴ∂ fσℓℓσω*\n*│● тнє gʀσυᴘѕ ʀᴜℓєѕ!*\n*│● ©ᴘσωєʀє∂ ву яαнмαη-м∂*\n*╰┉┉┉┉┈┈┈┈┈┈┈┈┈┈┉┉┉᛫᛭*";

const defaultGoodbyeMessage = "╭ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄─ׂ┄─ׅ─ׂ┄──┄──*\n*│  ̇─̣─̇─̣〘 gσσ∂вує 〙̣─̇─̣─̇*\n*├┅┅┅┅┈┈┈┈┈┈┈┈┈┈┈┅┅┅◆*\n*│❀ ᴜѕєʀ* @user\n*│● мємвєʀѕ ιѕ ℓєfт тнє gʀσᴜᴘ**\n*│● ©ᴘσωєʀє∂ ву яαнмαη м∂*\n*╰┉┉┉┉┈┈┈┈┈┈┈┈┈┈┉┉┉᛫᛭*";

// Format message function
function formatMessage(template, userMention, groupName, groupDesc) {
  return template
    .replace("@user", userMention)
    .replace("@group", groupName)
    .replace("@desc", groupDesc);
}

// Welcome Command
cmd(
  {
    pattern: "welcome",
    desc: "* 🎀 υѕαgє: ωєℓ¢σмє σɴ | ωєℓ¢σмє σff | ωєℓ¢σмє <¢υѕтσм мєѕѕαgє>*",
    category: "group",
    filename: __filename,
  },
  async (conn, mek, m, { from, args, reply, isGroup, isCreator }) => {
    try {
      if (!isGroup) return reply("This command can only be used in groups.");
      if (!isCreator) return reply("*🫟 σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

      if (args.length === 0) {
        const setting = welcomeSettings[from];
        if (setting && setting.enabled) {
          return reply(`* 🎀 υѕαgє: ωєℓ¢σмє σɴ | ωєℓ¢σмє σff | ωєℓ¢σмє <¢υѕтσм мєѕѕαgє>*`);
        } else {
          return reply("*🎀 υѕαgє: ωєℓ¢σмє σɴ | ωєℓ¢σмє σff | ωєℓ¢σмє <¢υѕтσм мєѕѕαgє>*");
        }
      }

      const option = args[0].toLowerCase();
      if (option === "on") {
        welcomeSettings[from] = { enabled: true, message: defaultWelcomeMessage };
        settings.welcome = welcomeSettings;
        saveSettings(settings);
        return reply("*✅ ωєℓ¢σмє нαѕ вєєɴ єɴαвℓє∂*");
      } else if (option === "off") {
        welcomeSettings[from] = { enabled: false, message: "" };
        settings.welcome = welcomeSettings;
        saveSettings(settings);
        return reply("*❌ ωєℓ¢σмє нαѕ вєєɴ ∂ιѕαвℓє∂*");
      } else {
        const customMsg = args.join(" ");
        welcomeSettings[from] = { enabled: true, message: customMsg };
        settings.welcome = welcomeSettings;
        saveSettings(settings);
        return reply(`*ωєℓ¢σмє мєѕѕαgє ѕєт тσ:*\n${customMsg}`);
      }
    } catch (e) {
      console.log(e);
      m.reply(`${e}`);
    }
  }
);

// Goodbye Command
cmd(
  {
    pattern: "goodbye",
    desc: "*🎀 υѕαgє: gσσ∂вує σɴ | gσσ∂вує σff | gσσ∂вує <¢υѕтσм мєѕѕαgє>*",
    category: "group",
    filename: __filename,
  },
  async (conn, mek, m, { from, args, reply, isGroup, isCreator }) => {
    try {
      if (!isGroup) return reply("This command can only be used in groups.");
      if (!isCreator) return reply("*🫟 σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

      if (args.length === 0) {
        const setting = goodbyeSettings[from];
        if (setting && setting.enabled) {
          return reply(`*🎀 υѕαgє: gσσ∂вує σɴ | gσσ∂вує σff | gσσ∂вує <¢υѕтσм мєѕѕαgє>*`);
        } else {
          return reply("*🎀 υѕαgє: gσσ∂вує σɴ | gσσ∂вує σff | gσσ∂вує <¢υѕтσм мєѕѕαgє>*");
        }
      }

      const option = args[0].toLowerCase();
      if (option === "on") {
        goodbyeSettings[from] = { enabled: true, message: defaultGoodbyeMessage };
        settings.goodbye = goodbyeSettings;
        saveSettings(settings);
        return reply("*✅ gσσ∂вує нαѕ вєєɴ єɴαвℓє∂*");
      } else if (option === "off") {
        goodbyeSettings[from] = { enabled: false, message: "" };
        settings.goodbye = goodbyeSettings;
        saveSettings(settings);
        return reply("*❌ gσσ∂вує нαѕ вєєɴ ∂ιѕαвℓє∂*");
      } else {
        const customMsg = args.join(" ");
        goodbyeSettings[from] = { enabled: true, message: customMsg };
        settings.goodbye = goodbyeSettings;
        saveSettings(settings);
        return reply(`*gσσ∂вує мєѕѕαgє ѕєт тσ:*\n${customMsg}`);
      }
    } catch (e) {
      console.log(e);
      m.reply(`${e}`);
    }
  }
);

// Group Participants Update
function registerGroupMessages(conn) {
  conn.ev.on("group-participants.update", async (update) => {
    const groupId = update.id;
    let groupMetadata = null;

    try {
      groupMetadata = await conn.groupMetadata(groupId);
    } catch (error) {
      console.error("Error fetching group metadata:", error);
    }

    const groupName = groupMetadata ? groupMetadata.subject : "this group";
    const groupDesc = groupMetadata?.desc || " *No description available*";

    // Welcome
    if (update.action === "add") {
      for (let participant of update.participants) {
        const setting = welcomeSettings[groupId];
        if (setting && setting.enabled) {
          let dpUrl = "";
          try {
            dpUrl = await conn.profilePictureUrl(participant, "image");
          } catch (error) {
            dpUrl = "https://files.catbox.moe/49gzva.png";
          }
          const mention = `@${participant.split("@")[0]}`;
          const messageTemplate = setting.message || defaultWelcomeMessage;
          const welcomeText = formatMessage(messageTemplate, mention, groupName, groupDesc);

          await conn.sendMessage(groupId, {
            image: { url: dpUrl },
            caption: welcomeText,
            mentions: [participant],
          });
        }
      }
    }

    // Goodbye
    if (update.action === "remove") {
      for (let participant of update.participants) {
        const setting = goodbyeSettings[groupId];
        if (setting && setting.enabled) {
          let dpUrl = "";
          try {
            dpUrl = await conn.profilePictureUrl(participant, "image");
          } catch (error) {
            dpUrl = "https://files.catbox.moe/49gzva.png";
          }
          const mention = `@${participant.split("@")[0]}`;
          const messageTemplate = setting.message || defaultGoodbyeMessage;
          const goodbyeText = formatMessage(messageTemplate, mention, groupName, groupDesc);

          await conn.sendMessage(groupId, {
            image: { url: dpUrl },
            caption: goodbyeText,
            mentions: [participant],
          });
        }
      }
    }
  });
}

module.exports = { registerGroupMessages };
