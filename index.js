const { default: WASocket, useSingleFileAuthState, fetchLatestBaileysVersion, DisconnectReason, makeInMemoryStore, jidDecode} = require('@adiwajshing/baileys')
const Pino = require('pino')
const logg = require('pino')
const chalk = require('chalk')
const { footer, sessionName } = require('./config.json')
const { Boom } = require('@hapi/boom')
const { existsSync } = require('fs')
const fs = require('fs')
const moment = require('moment')
const path = require('path')
const { getBuffer, serialize } = require("./utils/myfunc");
const { state, saveState, saveCreds } = useSingleFileAuthState(path.resolve(`${sessionName}.json`), Pino({ level: 'silent' }))
const messageHandler = require('./handler/app')
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const konekinWhatsApp = async () => {
    let { version, isLatest } = await fetchLatestBaileysVersion()

    console.log(`Using: ${version}, newer: ${isLatest}`)
    const getVersionWaweb = () => {
        let version
        try {
        let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
        version = [a.currentVersion.replace(/[.]/g, ', ')]
        } catch {
        version = [2, 2204, 13]
        }
        return version
}

    const sock = WASocket({
        logger: Pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['Fiibot','Safari','1.0.0'],
        auth: state,
        version: getVersionWaweb() || [2, 2204, 13]        
    })
    store.bind(sock.ev)    

    sock.ev.on('chats.set', () => {
        console.log('got chats', store.chats.all().length)
    })

    sock.ev.on('contacts.set', () => {
        console.log('got contacts', Object.values(store.contacts).length)
    })
    
    function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
    
    function nocache(module, cb = () => { }) {
      console.log(`${module} is running`)
        fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
      })
}
    require('./utils/fiibothome')
    require('./utils/myfunc')
    require('./handler/app')
    require('./config.json')
    nocache('./utils/fiibothome', module => console.log(chalk.greenBright('[ sock ID ]  ') + time + chalk.cyanBright(` "${module}" Updated`)))
    nocache('./utils/myfunc', module => console.log(chalk.greenBright('[ sock ID ]  ') + time + chalk.cyanBright(` "${module}" Updated`)))
    nocache('./handler/app', module => console.log(chalk.greenBright('[ sock ID ]  ') + time + chalk.cyanBright(` "${module}" Updated`)))

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
        ? konekinWhatsApp() : console.log('Fiibot disconnected')
        }
        console.log('Fiibot is connected', update)
        })
        sock.ev.on ('creds.update', () =>  saveCreds)

    // messages.upsert
    sock.modelmenu = "gif"
    sock.ev.on('messages.upsert', ({ messages, type }) => {
        if (type !== 'notify') return
        require('./handler/app')(sock, messages[0])
    })

sock.ev.on('group-participants.update', async (data) => {
        const { isSetWelcome, addSetWelcome, removeSetWelcome, changeSetWelcome, getTextSetWelcome } = require('./utils/setwelcome');
        const { isSetLeft, addSetLeft, removeSetLeft, changeSetLeft, getTextSetLeft } = require('./utils/setleft');
        
        let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
        let left = JSON.parse(fs.readFileSync('./database/left.json'))
        let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'))
        let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'))
        
        const isWelcome = welcome.includes(data.id) ? true : false
        const isLeft = left.includes(data.id) ? true : false
        const metadata = await sock.groupMetadata(data.id)
        const groupName = metadata.subject
        const groupDesc = metadata.desc
        const groupMem = metadata.participants.length
        const buttwelc = [{buttonId: `.listadmin`, buttonText: {displayText: 'Admin'}, type: 1}, {buttonId: `.shp`, buttonText: {displayText: 'Menu️'}, type: 1}]
        const buttleft = [{buttonId: `.shp`, buttonText: {displayText: 'Menu'}, type: 1}]
        const momenttz = require('moment-timezone')
        const dateid = momenttz().tz("Asia/Jakarta").locale("id").format("dddd, ll")
        const date = momenttz().tz("Asia/Jakarta").format("dddd. ll")
        const clock = momenttz().tz('Asia/Jakarta').locale("id").format("HH:mm:ss‎ z")
        const _time = momenttz(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        if (_time == 'pagi') {
            var waktu = 'Morning'
            var emojiWaktu = '🌞'
        } else if (_time == 'siang') {
            var waktu = 'Noon'
            var emojiWaktu = '🌞'
        } else if (_time == 'sore') {
            var waktu = 'Afternoon'
            var emojiWaktu = '🌞'
        } else if (_time == 'malam') {
            var waktu = 'Night'
            var emojiWaktu = '🌚'
        }
        const _timeid = momenttz(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        if (_timeid == 'pagi') {
            var waktuid = 'Pagi'
            var emojiWaktuid = '🌞'
        } else if (_timeid == 'siang') {
            var waktuid = 'Siang'
            var emojiWaktuid = '🌞'
        } else if (_timeid == 'sore') {
            var waktuid = 'Sore'
            var emojiWaktuid = '🌞'
        } else if (_timeid == 'malam') {
            var waktuid = 'Malam'
            var emojiWaktuid = '🌚'
        }
        try {
            for (let i of data.participants) {
                if (data.action == "add" && isWelcome) {
                    try {
                        var pp_user = await sock.profilePictureUrl(i, 'image')
                    } catch {
                        var pp_user = 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
                    }
                    if (isSetWelcome(data.id, set_welcome_db)) {
                        var get_teks_welcome = getTextSetWelcome(data.id, set_welcome_db)
                        var replace_pesan = (get_teks_welcome.replace(/@name/gi, `@${i.split('@')[0]}`))
                        var full_pesan = (replace_pesan.replace(/#group/gi, groupName).replace(/#des/gi, groupDesc).replace(/#member/gi, groupMem).replace(/#iddate/gi, dateid).replace(/#date/gi, date).replace(/#clock/gi, clock).replace(/#time/gi, `${waktu} ${emojiWaktu}`).replace(/#idtime/gi, `${waktuid} ${emojiWaktuid}`))
                        sock.sendMessage(data.id, { caption: `${full_pesan}`, image: await getBuffer(pp_user), buttons: buttwelc, footer: footer, mentions: [i] })
                    } else {
                        sock.sendMessage(data.id, { caption: `@${i.split('@')[0]} join group`, image: await getBuffer(pp_user), buttons: buttwelc, footer: footer, mentions: [i] })
                    }
                } else if (data.action == "remove" && isLeft) {
                    try {
                        var pp_user = await sock.profilePictureUrl(i, 'image')
                    } catch {
                        var pp_user = 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
                    }
                    if (isSetLeft(data.id, set_left_db)) {
                        var get_teks_left = getTextSetLeft(data.id, set_left_db)
                        var replace_pesan = (get_teks_left.replace(/@name/gi, `@${i.split('@')[0]}`))
                        var full_pesan = (replace_pesan.replace(/#group/gi, groupName).replace(/#des/gi, groupDesc).replace(/#member/gi, groupMem).replace(/#iddate/gi, dateid).replace(/#date/gi, date).replace(/#clock/gi, clock).replace(/#time/gi, `${waktu} ${emojiWaktu}`).replace(/#idtime/gi, `${waktuid} ${emojiWaktuid}`))
                        sock.sendMessage(data.id, { caption: `${full_pesan}`, image: await getBuffer(pp_user), buttons: buttleft, footer: footer, mentions: [i] })
                    } else {
                        sock.sendMessage(data.id, { caption: `@${i.split("@")[0]} leaving group`, image: await getBuffer(pp_user), buttons: buttleft, footer: footer, mentions: [i] })
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    })
    
    sock.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
}
konekinWhatsApp()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})