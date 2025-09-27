const config = require('../config')
const { cmd, commands } = require('../command')

// 🟢 OPEN TIME COMMAND
cmd({
    pattern: "opentime",
    react: "🔖",
    desc: "To open group after a set time",
    category: "group",
    use: '.opentime <number> <second|minute|hour|day>',
    filename: __filename
},
async (conn, mek, m, { from, l, args, q, isGroup, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply(ONLGROUP)
        if (!isAdmins) return reply(ADMIN)

        let timer;
        if (args[1] === 'second') {
            timer = Number(args[0]) * 1000
        } else if (args[1] === 'minute') {
            timer = Number(args[0]) * 60000
        } else if (args[1] === 'hour') {
            timer = Number(args[0]) * 3600000
        } else if (args[1] === 'day') {
            timer = Number(args[0]) * 86400000
        } else {
            return reply('*Select:*\nsecond\nminute\nhour\nday\n\n*Example:*\n.opentime 10 second')
        }

        reply(`✅ ᴏᴘᴇɴ ᴛɪᴍᴇ sᴇᴛ ғᴏʀ *${q}*. ɢʀᴏᴜᴘ ᴡɪʟʟ ᴏᴘᴇɴ ᴀғᴛᴇʀ ᴛʜɪs ᴅᴜʀᴀᴛɪᴏɴ.`)

        // Reaction ⏳ 
        await conn.sendMessage(from, { react: { text: `⏳`, key: mek.key } })

        setTimeout(async () => {
            const openMsg = `*_ᴏᴘᴇɴ ᴛɪᴍᴇ_* 🔓\n*_ɢʀᴏᴜᴘ ʜᴀs ʙᴇᴇɴ ᴏᴘᴇɴᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*\n*_ɴᴏᴡ ᴍᴇᴍʙᴇʀs ᴄᴀɴ sᴇɴᴅ ᴍᴇssᴀɢᴇs._*`

            await conn.groupSettingUpdate(from, 'not_announcement')
            reply(openMsg)

            // Reaction ✅ 
            await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } })
        }, timer)

    } catch (e) {
        reply('*Error !!*')
        l(e)
    }
})

// 🔴 CLOSE TIME COMMAND
cmd({
    pattern: "closetime",
    react: "🔖",
    desc: "To close group after a set time",
    category: "group",
    use: '.closetime <number> <second|minute|hour|day>',
    filename: __filename
},
async (conn, mek, m, { from, l, args, q, isGroup, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply(ONLGROUP)
        if (!isAdmins) return reply(ADMIN)

        let timer;
        if (args[1] === 'second') {
            timer = Number(args[0]) * 1000
        } else if (args[1] === 'minute') {
            timer = Number(args[0]) * 60000
        } else if (args[1] === 'hour') {
            timer = Number(args[0]) * 3600000
        } else if (args[1] === 'day') {
            timer = Number(args[0]) * 86400000
        } else {
            return reply('*Select:*\nsecond\nminute\nhour\nday\n\n*Example:*\n.closetime 5 minute')
        }

        reply(`✅ ᴄʟᴏsᴇ ᴛɪᴍᴇ sᴇᴛ ғᴏʀ *${q}*. ɢʀᴏᴜᴘ ᴡɪʟʟ ᴄʟᴏsᴇ ᴀғᴛᴇʀ ᴛʜɪs ᴅᴜʀᴀᴛɪᴏɴ.`)

        // Reaction ⏳ 
        await conn.sendMessage(from, { react: { text: `⏳`, key: mek.key } })

        setTimeout(async () => {
            const closeMsg = `*_ᴄʟᴏsᴇ ᴛɪᴍᴇ_* 🔐\n*_ɢʀᴏᴜᴘ ʜᴀs ʙᴇᴇɴ ᴄʟᴏsᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*.\n*_ɴᴏᴡ ᴏɴʟʏ ᴀᴅᴍɪɴs ᴄᴀɴ sᴇɴᴅ ᴍᴇssᴀɢᴇs.._*`

            await conn.groupSettingUpdate(from, 'announcement')
            reply(closeMsg)

            // Reaction ✅ 
            await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } })
        }, timer)

    } catch (e) {
        reply('*Error !!*')
        l(e)
    }
})