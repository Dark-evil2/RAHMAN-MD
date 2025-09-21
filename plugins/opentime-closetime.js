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

        reply(`✅ Open time set for *${q}*. Group will open after this duration.`)

        // Reaction ⏳ lagao
        await conn.sendMessage(from, { react: { text: `⏳`, key: mek.key } })

        setTimeout(async () => {
            const openMsg = `*_OPEN TIME_* 🔓\nGroup has been opened by *RAHMAN-MD*.\nNow members can send messages.`

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

        reply(`✅ Close time set for *${q}*. Group will close after this duration.`)

        // Reaction ⏳ lagao
        await conn.sendMessage(from, { react: { text: `⏳`, key: mek.key } })

        setTimeout(async () => {
            const closeMsg = `*_CLOSE TIME_* 🔐\nGroup has been closed by *RAHMAN-MD*.\nNow only admins can send messages.`

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