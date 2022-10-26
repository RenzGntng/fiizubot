"use strict";
const { WASocket, proto, getContentType, downloadContentFromMessage, decodeJid, generateWAMessageFromContent, generateWAMessage } = require('@adiwajshing/baileys')
const axios = require('axios').default
const { PassThrough } = require('stream')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const FormData = require('form-data')
const chalk = require('chalk')
const fs = require('fs')
const Math_js = require('mathjs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ms = require('parse-ms')
const toMS = require("ms");
const xzons = require("xzons-api");
const { exec, spawn } = require("child_process");
let { sizeFormatter } = require("human-readable");
let format = sizeFormatter({
  std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});
let packjson = require('../package.json')

//lib/utils
const _sewa = require("../utils/sewa");
const _jadiown = require("../utils/jadiowner");
const afkg = require("../utils/afk");
const { allMenu, fiizumenu, txtprofile } = require('../utils/help.js')
const { FiizuBotusgaddlist, FiizuBotavladdlist, FiizuBotusgdellist, FiizuBotusgupdlist, FiizuBotusgrename, FiizuBotusgpause, FiizuBotusgkalkulator, FiizuBotusgsetproses, FiizuBotusgsetdone,
FiizuBotusgsetbot, FiizuBotusgaddjs, FiizuBotusgkickjs, FiizuBotusgaddadmnjs, FiizuBotusgdeladmnjs, FiizuBotusgaddtime, FiizuBotusgpicgc, FiizuBotusgdessubgc, FiizuBotusgsetopen,
FiizuBotusgsetclose, FiizuBotusgsetwelcome, FiizuBotusgsetleave, FiizuBotusgstickertext, FiizuBotusgemojimix, FiizuBotusgsticker, FiizuBotusgidgame, FiizuBotusgidserver, FiizuBotusgbc, FiizuBotsuccsendbc,
FiizuBotusgjoin, FiizuBotusgsearchsticker } = require('../utils/fiibotrespond.js')
const { isSetWelcome, addSetWelcome, changeSetWelcome, removeSetWelcome } = require('../utils/setwelcome');
const { isSetLeft, addSetLeft, removeSetLeft, changeSetLeft } = require('../utils/setleft');
const { addResponList, delResponList, changeList, resetListAll, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../utils/respon-list');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('../utils/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('../utils/setdone');
const { isSetOpen, addSetOpen, removeSetOpen, changeSetOpen, getTextSetOpen } = require("../utils/setopen");
const { isSetClose, addSetClose, removeSetClose, changeSetClose, getTextSetClose } = require("../utils/setclose");
const { isSetBot, addSetBot, removeSetBot, changeSetBot, getTextSetBot } = require('../utils/setbot');
const { getBuffer, serialize, getRandom, fetchJson, runtime, reSize } = require("../utils/myfunc");
const { smsg, parseMention } = require('../utils/mysim')
let mess = JSON.parse(fs.readFileSync('./utils/mess.json'));
let myres = JSON.parse(fs.readFileSync('./utils/fiibotresponse.json'));
//database
let jadiowner = JSON.parse(fs.readFileSync('./database/jadiowner.json'));
let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));
let set_bot = JSON.parse(fs.readFileSync('./database/set_bot.json'));
let _afks = JSON.parse(fs.readFileSync('./database/afg.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
let set_open = JSON.parse(fs.readFileSync('./database/set_open.json'));
let set_close = JSON.parse(fs.readFileSync('./database/set_close.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let pricelist = JSON.parse(fs.readFileSync('./database/pricelist.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let antilinkall = JSON.parse(fs.readFileSync('./database/antilinkall.json'))
//END
/**
 *
 * @param { string } text
 * @param { string } color
 */
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}

/**
 * @param {WASocket} sock
 * @param {proto.IWebMessageInfo} msg
 */
 // Bandwidth
async function checkBandwidth() {
    let ind = 0;
    let out = 0;
    for (let i of await require("node-os-utils").netstat.stats()) {
        ind += parseInt(i.inputBytes);
        out += parseInt(i.outputBytes);
    }
    return {
        download: format(ind),
        upload: format(out),
    };
}

module.exports = async (sock, msg, m, rm, welcome, left, set_welcome_db, set_left_db) => {
    const { ownerNumber, ownnumber, ownerName, sessionName, homelandscape, thumbhome, pathimg, groupIcon, logoafk, botName, owncek, footer } = require('../config.json')
    const extendedText = getContentType
    const FiizuBot = sock
    const mono = '```'
    m = serialize(sock, msg)
    rm = smsg(sock, msg)
    let homelands = fs.readFileSync(homelandscape)
    let pichomepage = fs.readFileSync(thumbhome)
    let thumb = fs.readFileSync(pathimg)
    let thum = fs.readFileSync(pathimg)
    let thumafk = fs.readFileSync(logoafk)
    let dev = ownerNumber
    const time = moment().tz('Asia/Jakarta').format('HH:mm:ss')
    const tanggal = moment().tz("Asia/Jakarta").format("dddd, ll")
    const tanggalid = moment().tz("Asia/Jakarta").locale('id').format("dddd, ll")
    const jam = moment().tz("Asia/Jakarta").locale('id').format("HH:mm:ss z")
    const _time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
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
    const _timeid = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
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
    if (msg.key && msg.key.remoteJid === 'status@broadcast') return
    if (!msg.message) return

    const type = getContentType(msg.message)
    const quotedType = getContentType(msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) || null
    if (type == 'ephemeralMessage') {
        msg.message = msg.message.ephemeralMessage.message
        msg.message = msg.message.ephemeralMessage.message.viewOnceMessage
    }
    if (type == 'viewOnceMessage') {
        msg.message = msg.message.viewOnceMessage.message
    }

    const botId = sock.user.id.includes(':') ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : sock.user.id
    const version = packjson.version
    const updateon = 'Oct 3, 2022'
    const releasedon = 'Jun 20, 2022'
    const apikey = `WOLSET`
    
    const more = String.fromCharCode(8206)
    const readmore = more.repeat(4001)
    const readhome = more.repeat(1000)

    const botNumber = await sock.decodeJid(sock.user.id)
    const from = msg.key.remoteJid
    const body = type == 'conversation' ? msg.message?.conversation : msg.message[type]?.caption || msg.message[type]?.text || ''
    const chata = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type == "templateButtonReplyMessage" && msg.message.templateButtonReplyMessage.selectedId) ? msg.message.templateButtonReplyMessage.selectedId : (type == "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == "messageContextInfo") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    const responseMessage = type == 'listResponseMessage' ? msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || '' : type == 'buttonsResponseMessage' ? msg.message?.buttonsResponseMessage?.selectedButtonId || '' : ''
    const isGroup = from.endsWith('@g.us')
    const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''

    var sender = isGroup ? msg.key.participant : msg.key.remoteJid
    sender = sender.includes(':') ? sender.split(':')[0] + '@s.whatsapp.net' : sender
    const senderName = msg.pushName
    const senderNumber = sender.split('@')[0]
    const pushname = msg.pushName

    const groupMetadata = isGroup ? await sock.groupMetadata(from) : null
    const groupName = groupMetadata?.subject || ''
    const groupMembers = groupMetadata?.participants || []
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)

    const isCmd = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#/$%^&.+-,\\\©^]/.test(chata)
    const prefix = isCmd ? body[0] : ''
    const isGroupAdmins = groupAdmins.includes(sender)
    const isBotGroupAdmins = groupMetadata && groupAdmins.includes(botId)
    const isOwner = ownerNumber.includes(sender)
    const isDev = dev.includes(sender) 
    const Xcommand = chata.toLowerCase().split(' ')[0] || ''
    const XisCmd = Xcommand.startsWith(prefix)
    
    let command = isCmd ? chata.slice(1).trim().split(' ').shift().toLowerCase() : ''
    let responseId = msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || msg.message?.buttonsResponseMessage?.selectedButtonId || null
    let args = body.trim().split(' ').slice(1)
    let full_args = body.replace(command, '').slice(1).trim()
    let q = args.join(" ")
    let args1 = q.split("@")[0]
    let args2 = q.split("@")[1]
    
    const isAfkOn = afkg.checkAfkUser(sender, _afks)
    const isJadiowner = _jadiown.checkSewaGroup2(from, jadiowner)
    const isAntiLink = antilink.includes(from) ? true : false
    const isAntiLinkAll = antilinkall.includes(from) ? true : false
    const isAntiWame = antiwame.includes(from) ? true : false
    const isPricelist = pricelist.includes(from) ? true : false
    const isSewa = _sewa.checkSewaGroup(from, sewa)
    const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
    const isLeft = isGroup ? left.includes(from) ? true : false : false
    const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
    const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
    const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
    mention != undefined ? mention.push(mentionByReply) : []
    const mentionUser = mention != undefined ? mention.filter(n => n) : []
    let mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []

    async function downloadAndSaveMediaMessage (type_file, path_file) {
        	if (type_file === 'image') {
                var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'video') {
                var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'sticker') {
                var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'audio') {
                var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	}
        }
        
        async function sendStickerFromUrl(from, url, packname1 = stc.packname, author1 = stc.author, options = {}) {
        	var names = Date.now() / 10000;
        	var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	            });
        	};
            exif.create(packname1, author1, `sendstc_${names}`)
        	download(url, './temp/' + names + '.png', async function () {
                let filess = './temp/' + names + '.png'
        	    let asw = './temp/' + names + '.webp'
        	    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=60 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, async (err) => {
        	        exec(`webpmux -set exif ./temp/sendstc_${names}.exif ${asw} -o ${asw}`, async (error) => {
                        FiizuBot.sendMessage(from, { sticker: fs.readFileSync(asw) }, options)
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
        	        })
                })
        	})
        }
        
        const sendFileFromUrl = async (from, url, caption, options = {}) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headerd["content-type"]
            let type = mime.split("/")[0]+"Message"
            if (mime.split("/")[0] === "image") {
               var img = await getBuffer(url)
               return FiizuBot.sendMessage(from, { image: img, caption: caption }, options)
            } else if (mime.split("/")[0] === "video") {
               var vid = await getBuffer(url)
               return FiizuBot.sendMessage(from, { video: vid, caption: caption }, options)
            } else if (mime.split("/")[0] === "audio") {
               var aud = await getBuffer(url)
               return FiizuBot.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
            } else {
               var doc = await getBuffer(url)
               return FiizuBot.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
            }
        }
        
        //jeda time
        setInterval(() => {
        for (let i of Object.values(opengc)) {
            if (Date.now() >= i.time) {
                FiizuBot.groupSettingUpdate(i.id, "not_announcement")
                .then((res) =>
                FiizuBot.sendMessage(i.id, { text: `*⌛〡Pause time has ended*` }))
                .then((res) =>
                FiizuBot.sendMessage(i.id, { text: `*✅〡Group opened*` }))
                .catch((err) =>
                FiizuBot.sendMessage(i.id, { text: '*⛔〡There is an error*' }))
                delete opengc[i.id]
                fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            }
        }
    }, 1000)
        
        FiizuBot.createMessage = async (jidnya, kontennya, optionnya) => {
            return await generateWAMessage(jidnya, kontennya, {...optionnya,userJid: FiizuBot.authState.creds.me.id,upload: FiizuBot.waUploadToServer})
            }

    const isImage = type == 'imageMessage'
    const isVideo = type == 'videoMessage'
    const isAudio = type == 'audioMessage'
    const isSticker = type == 'stickerMessage'
    const isContact = type == 'contactMessage'
    const isLocation = type == 'locationMessage'

    const isQuoted = type == 'extendedTextMessage'
    const isQuotedImage = isQuoted && quotedType == 'imageMessage'
    const isQuotedVideo = isQuoted && quotedType == 'videoMessage'
    const isQuotedAudio = isQuoted && quotedType == 'audioMessage'
    const isQuotedSticker = isQuoted && quotedType == 'stickerMessage'
    const isQuotedContact = isQuoted && quotedType == 'contactMessage'
    const isQuotedLocation = isQuoted && quotedType == 'locationMessage'

    var mediaType = type
    var stream
    if (isQuotedImage || isQuotedVideo || isQuotedAudio || isQuotedSticker) {
        mediaType = quotedType
        msg.message[mediaType] = msg.message.extendedTextMessage.contextInfo.quotedMessage[mediaType]
        stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace('Message', '')).catch(console.error)
    }
    
    //SEWA WAKTU
_sewa.expiredCheck(FiizuBot, sewa)
   
    if (!isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ PRIVATE ]', 'aqua'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[  GROUP  ]', 'aqua'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))
    if (!isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'aqua'), color(body, 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'aqua'), color(body, 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))

function hitungmundur(bulan, tanggal) {
            let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
            let now = Date.now();
            let distance = from - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
        }
        
        var { download, upload } = await checkBandwidth();
        let mundur = hitungmundur(7, 9)
        var txthome = allMenu(waktu, emojiWaktu, pushname, jam, tanggal, readhome)
        var myfiizumenu = fiizumenu(pushname, ownerNumber)
        var mytxtprofile = txtprofile(botName, ownerName, version, updateon, releasedon)
        
    const reply = async (text) => {
        return sock.sendMessage(from, { text: text }, { quoted: msg })
    }
    const repky = async (text) => {
        return sock.sendMessage(from, { text: text })
    }
    
    function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        
        const isUrl = (url) => {
        	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        
        const sendContact = (jid, numbers, name, quoted, mn) => {
        	let number = numbers.replace(/[^0-9]/g, '')
        	const vcard = 'BEGIN:VCARD\n' 
        	+ 'VERSION:3.0\n' 
        	+ 'FN:Open rental bot\n'
        	+ 'ORG:;\n'
        	+ 'TEL;type=WhatsApp Owner;type=VOICE;waid=' + number + ':+' + number + '\n'
        	+ 'END:VCARD'
        	return FiizuBot.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
        }
        
        const isEmoji = (emo) => {
            let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            let regexEmoji = new RegExp(emoji_ranges, 'gi');
            return emo.match(regexEmoji)
        }
        
        async function getGcName(groupID) {
            try {
                let data_name = await FiizuBot.groupMetadata(groupID)
                return data_name.subject
            } catch (err) {
                return '*❎〡Not Found*'
            }
        }
    
    function mentions(teks, mems = [], id) {
        	if (id == null || id == undefined || id == false) {
        	    let res = FiizuBot.sendMessage(from, { text: teks, mentions: mems })
        	    return res
        	} else {
                let res = FiizuBot.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
                return res
            }
        }
        
    var usgaddlist = FiizuBotusgaddlist('.'+command)
    var avladdlis = FiizuBotavladdlist(args1)
    var usgdellist = FiizuBotusgdellist('.'+command)
    var usgrename = FiizuBotusgrename('.'+command)
    var usgrename = FiizuBotusgrename('.'+command)
    var usgpause = FiizuBotusgpause('.'+command)
    var usgkalkulator = FiizuBotusgkalkulator('.'+command)
    var usgsetproses = FiizuBotusgsetproses('.'+command)
    var usgsetdone = FiizuBotusgsetdone('.'+command)
    var usgsetbot = FiizuBotusgsetbot('.'+command)
    var usgkickjs = FiizuBotusgkickjs('.'+command)
    var usgaddadmnjs = FiizuBotusgaddadmnjs('.'+command)
    var usgdeladmnjs = FiizuBotusgdeladmnjs('.'+command)
    var usgaddtime = FiizuBotusgaddtime('.'+command)
    var usgpicgc = FiizuBotusgpicgc('.'+command)
    var usgdessubgc = FiizuBotusgdessubgc('.'+command)
    var usgsetopen = FiizuBotusgsetopen('.'+command)
    var usgsetclose = FiizuBotusgsetclose('.'+command)
    var usgsetwelcome = FiizuBotusgsetwelcome('.'+command)
    var usgsetleave = FiizuBotusgsetleave('.'+command)
    var usgstickertext = FiizuBotusgstickertext('.'+command)
    var usgemojimix = FiizuBotusgemojimix('.'+command)
    var usgsticker = FiizuBotusgsticker('.'+command)
    var usgidgame = FiizuBotusgidgame('.'+command)
    var usgidserver = FiizuBotusgidserver('.'+command)
    var usgbc = FiizuBotusgbc('.'+command)
    var usgaddjs = FiizuBotusgaddjs('.'+command)
    var usgjoin = FiizuBotusgjoin('.'+command)
    var usgsearchsticker = FiizuBotusgsearchsticker('.'+command)


const sendOrder = async(jid, text, orid, img, itcount, title, sellers, tokens, ammount) => {
const order = generateWAMessageFromContent(jid, proto.Message.fromObject({
 "orderMessage": {
"orderId": orid, // Ganti Idnya
"thumbnail": img, // Ganti Imagenya
"itemCount": itcount, // Ganti Item Countnya
"status": "INQUIRY", // Jangan Diganti
"surface": "CATALOG", // Jangan Diganti
"orderTitle": title, // Ganti Titlenya
"message": text, // Ganti Messagenya
"sellerJid": sellers, // Ganti sellernya
"token": tokens, // Ganti tokenya
"totalAmount1000": ammount, // Ganti Total Amountnya
"totalCurrencyCode": "IDR", // Terserah
}
}), { userJid: jid })
FiizuBot.relayMessage(jid, order.message, { messageId: order.key.id})
}
 
      //MULAI AFK
	if (isGroup) {
		for (let x of mentionUser) {
		    if (afkg.checkAfkUser(x, _afks)) {
			const getId = afkg.getAfkId(x, _afks)
			const getReason = afkg.getAfkReason(getId, _afks)
			const getTime = afkg.getAfkTime(getId, _afks)
			//if (FiizuBot.message.extendedTextMessage != undefined){ 
	        try {
            var afpk = await FiizuBot.profilePictureUrl(mentionUser[0], 'image')
            } catch {
            var afpk = 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
            }
            var thumeb = await getBuffer(afpk)
              const aluty = `*•⊣| Admin Afk |⊢•*\n\n${pushname} is Offline\n∘ Reason  : ${getReason}\n∘ Afk time : ${getTime}`
      FiizuBot.sendMessage(from, { text: aluty, contextInfo:{ externalAdReply:{ title: `[ AFK ] Active`, body: pushname, thumbnail: afkImage, sourceUrl: `https://wa.me/${sender}`, mediaUrl: '', renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}});
      //sendMess(x, `Assalamualaikum\n\n_Ada Yg Mencari Kamu Saat Kamu Offline/Afk_\n\nNama : ${pushname}\nNomor : wa.me/${sender.split("@")[0]}\nDi Group : ${groupName}\nPesan : ${chata}`)
      }}
      //KEMBALI DARI AFK
	  if (afkg.checkAfkUser(sender, _afks)) {
      const getTime = afkg.getAfkTime(sender, _afks)
	  const getReason = afkg.getAfkReason(sender, _afks)
	  const ittung = ms(await Date.now() - getTime)
      try {
      var afpkk = await FiizuBot.profilePictureUrl(sender, 'image')
      } catch {
      var afpkk = 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
      }
      var thumbw = await getBuffer(afpkk)
	  const pep = `*•⊣| Admin Online |⊢•*\n\n${pushname} is online`
      FiizuBot.sendMessage(from, { text: pep, contextInfo:{ mentionedJid: [sender], externalAdReply:{ title: `[ AFK ] Nonactive`, body: pushname, thumbnail: thumbw, sourceUrl: `https://wa.me/${sender}`, mediaUrl: '', renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}});
	  _afks.splice(afkg.getAfkPosition(sender, _afks), 1)
	  fs.writeFileSync('./database/afkg.json', JSON.stringify(_afks))
	  }
	  }

    const replyDeface = (teks) => {
            return FiizuBot.sendMessage(from, {
                text: teks, contextInfo: {
                    externalAdReply: {
                        title: `${botName}😴`,
                        body: `Onlineshop Bot`,
                        mediaType: 2,
                        thumbnail: thumb,
                        sourceUrl: `https://wa.me/${owncek}`
                    }
                }
            }, { quoted: msg })
        }
        
    const replyDefaceGc = (teks) => {
            return FiizuBot.sendMessage(from, {
                text: teks, contextInfo: {
                    externalAdReply: {
                        title: `${botName}😴`,
                        body: `Onlineshop Bot`,
                        mediaType: 2,
                        thumbnail: thumb,
                        sourceUrl: `https://chat.whatsapp.com/F0BT0ZTB6s09HeaZSbyuzq`
                    }
                }
            }, { quoted: msg })
        }
        
        if (chata.startsWith("®") && isDev) {
            console.log(color('[ EXEC ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
            exec(chata.slice(2), (err, stdout) => {
                if (err) return replyDeface(`${err}`)
                if (stdout) replyDeface(`${stdout}`)
            })
            }
        
        if (chata.startsWith(">") && isDev) {
	        console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
        try {
            let evaled = await eval(chata.slice(2))
            if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
            replyDeface(`${evaled}`)
        } catch (err) {
            replyDeface(`${err}`)
        }
        }
        
        FiizuBot.readMessages([msg.key])
        
        FiizuBot.sendPresenceUpdate('available', from)
        
// Detect Group Invite
if (m.mtype === 'groupInviteMessage') {
var eyeye = `*${botName} private mode*\n\nIf you want to add a bot, please contact /owner`
FiizuBot.sendMessage(from, {text: eyeye, contextInfo:{externalAdReply:{
title: ownerName,
body: `${botName} · Onlineshop Bot`,
thumbnail: thum,
mediaType:1,
renderLargerThumbnail: true,
showAdAttribution: true,
mediaUrl: 'https://wa.me/6283138644643',
sourceUrl: 'https://wa.me/6283138644643'
}}}, {quoted:m})
}

//AntiLink
if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match(/(https:\/\/chat.whatsapp.com)/gi)) {
replyDeface(`${mono}「 Sorry, Fiibot detect group link 」${mono}`)
FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match('chat.whatsapp.com/')) {
replyDeface(`${mono}「 Sorry, Fiibot detect group link 」${mono}`)
FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
}
}
//Antilinkwame
if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (chata.match(/(wa.me)/gi)) {
replyDeface(`${mono}「 Sorry, Fiibot detect wame link 」${mono}`)
FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match(/(https:\/\/wa.me)/gi)) {
replyDeface(`${mono}「 Sorry, Fiibot detect wame link 」${mono}`)
FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiLinkAll && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match('https://')) {
replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiLinkAll && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match('http://')) {
replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
}
}
if (isGroup && isAntiLinkAll && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (budy.match('.com')) {
replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
}
}
// Store Respon
        if (!isCmd && isGroup && isAlreadyResponList(from, chata, db_respon_list)) {
        var get_data_respon = getDataResponList(from, chata, db_respon_list)
        if (get_data_respon.isImage === false) {
        FiizuBot.sendMessage(from, { text: sendResponList(from, chata, db_respon_list) }, {
        quoted: msg
        })
        } else {
        FiizuBot.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
        quoted: msg
        })
        }
        }
        

    switch (command) {
    	
    case 'home':
        case 'help': case 'homepage':
            let buttonns = [
            { buttonId: `.profile`, buttonText: {displayText: 'Profile'}, type: 1}, { buttonId: `.shop`, buttonText: {displayText: 'List'}, type: 1}
            ]
            let buttonMessage = {
            document: fs.readFileSync("./temp/fbot.rtf"),
            mimetype: "application/rtf",
            fileName: emojiWaktu,
            fileLength: 856,
            caption: txthome,
            footer: `Version ${version}\nUpdate on ${updateon}\nReleased on ${releasedon}            `,
            buttons: buttonns,
            headerType: 4,
            contextInfo:{externalAdReply:{
            title: `Fiibot`,
            body: "Onlineshop Bot",
            thumbnail: homelands,
            thumbnailUrl: '',
            sourceUrl: `https://wa.me/${owncek}`,
            mediaUrl: `https://wa.me/${owncek}`,
            renderLargerThumbnail: true,
            showAdAttribution: false,
            mediaType: 1
            }}
            }
            FiizuBot.sendMessage(from, buttonMessage)
    break

    case "fiizu'scommand":
        case 'fiizucmd': case 'fiizuscommand':
            case 'fiizucommand': case "fiizu'scmd":
            FiizuBot.sendMessage(from, { text: myfiizumenu, contextInfo:{ externalAdReply:{ title: `Fiibot️`, body: "Onlineshop Bot", thumbnail: homelands, sourceUrl: `https://chat.whatsapp.com/F0BT0ZTB6s09HeaZSbyuzq`, mediaUrl: '', renderLargerThumbnail: false, showAdAttribution: false, mediaType: 1 }}});
    break

    case 'profile': case 'profil':
        case 'botinfo': case 'infobot':
            FiizuBot.sendMessage(from, { text: mytxtprofile, contextInfo:{ externalAdReply:{ title: `Fiibot️`, body: "Onlineshop Bot", thumbnail: homelands, sourceUrl: `https://chat.whatsapp.com/F0BT0ZTB6s09HeaZSbyuzq`, mediaUrl: '', renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}});
    break

    case 'afk':
        case 'offline': case 'off':
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!isGroup) return 
            if (isAfkOn) return reply('Afk is active')
            const reason = q ? q : 'Afk'
            afkg.addAfkUser(sender, time, reason, _afks)
            try {
            var afkjpg = await FiizuBot.profilePictureUrl(sender, 'image')
            } catch {
            var afkjpg = 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
            }
            var afkImage = await getBuffer(afkjpg)
            const aluty = `*•⊣| Admin Afk |⊢•*\n\n${pushname} is Offline\n∘ Reason  : ${reason}\n∘ Afk at : ${jam}`
            //FiizuBot.sendMessage(from, aluty, text)
            FiizuBot.sendMessage(from, { text: aluty, contextInfo:{ externalAdReply:{ title: `[ Afk ] Active`, body: pushname, thumbnail: afkImage, sourceUrl: `https://wa.me/${sender}`, mediaUrl: '', renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}});
    break

    case 'menu':
        case 'list': case 'shop':        
            if (!isGroup) return reply(mess.OnlyGroup)
            if (db_respon_list.length === 0) return reply(myres.list.nolist)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(myres.list.nolist)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var listMsg = {
                text: `${emojiWaktu} Good ${waktu} ${pushname}`,
                buttonText: myres.list.txtbuttlist,
                footer: `👑 ${groupName}                                                                 \n\n${mono}📆 ${tanggal}\n⏰ ${jam}${mono}`,
                mentions: [sender],
                sections: [{
                    title: `⋮☰ List from ${groupName}`, rows: arr_rows
                }]
            }
            FiizuBot.sendMessage(from, listMsg)
            //sendOrder(from, listMsg, "3836", thum, 2022, "MENU PRICELIST", `${owncek}@s.whatsapp.net`, "AR6ebQf7wTuyXrVneA0kUMMbQe67ikT6LZrwT2uge7wIEw==", "9783")
    break

    case 'ping':
        case 'run': case 'runtime':
            var now = require("performance-now")
                var istamp = now();
                var isstamp = now();
                var start = now() - istamp
                var end = now() - isstamp
                     replyDeface(`*Performance*\n• Start ${start.toFixed(3)}\n• Start-end ${(start-end).toFixed(3)}                              \n\n*Online Time*\n• ${runtime(process.uptime())}`)
    break

    case 'addlist':        
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!q.includes("@")) return reply(usgaddlist)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(avladdlist)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./temp/stickers/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(myres.list.txtaddlist)
                        .then((res) => repky(`➡️ ${args1}`))
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(myres.list.txtaddlist)
                .then((res) => repky(`➡️ ${args1}`))
            }
    break

    case 'dellist':
        case 'deletelist':        
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (db_respon_list.length === 0) return reply(myres.list.nodellist)
            if (!q) return reply(usgdellist)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(myres.list.nodellist)
            delResponList(from, q, db_respon_list)
            reply(myres.list.succdellist)
    break

    case 'reset‎list':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (db_respon_list.length === 0) return reply(myres.list.noresetlist)
            resetListAll(from, db_respon_list)
            reply(myres.list.succresetlist)
    break

    case 'dellist22':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (db_respon_list.length === 0) return reply(myres.list.nodellist)
            var uturu = q.split("@")[0]
            if (!q) return reply(usgdellist)
            if (!isAlreadyResponList(from, uturu, db_respon_list)) return reply(myres.list.nodellist)
            delResponList(from, uturu, db_respon_list)
            reply(myres.list.succdellist)
    break

    case 'rename':
        case 'renamelist':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!q.includes("@")) return reply(usgrename)
            if (!isAlreadyResponList(from, args1, db_respon_list)) return repky(myres.list.norename)
                changeList(from, args1, args2, db_respon_list)
                reply(myres.list.succrename)
    break

    case 'updatelist': case 'update':
        case 'updlist': case 'upd':
            case 'changelist':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!q.includes("@")) return reply(usgupdlist)
            if (!isAlreadyResponList(from, args1, db_respon_list)) return reply(myres.list.noupdlist)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./temp/stickers/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        updateResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(myres.list.succupdlist)
                        .then((res) => repky(args2))
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(myres.list.succupdlist)
                .then((res) => repky(args2))
            }
    break

    case 'resetlist':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            let txresetlist =`${mono}Are you sure to reset the group list?${mono}`
            var bttnresetlist = [{buttonId: `Cancel`, buttonText: { displayText: "Cancel" }, type: 1 },
            {buttonId: `.reset‎list`, buttonText: { displayText: "Yes" }, type: 1 }]
            FiizuBot.sendMessage(from, { text: txresetlist, buttons: bttnresetlist, mentions: [sender] })
    break

    case 'break':
        case 'jeda': {
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (!args[0]) return replyDeface(usgpause)
            .then((res) => repky(myres.resusgpause))
            opengc[from] = { id: from, time: Date.now() + toMS(args[0]) }
            fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            FiizuBot.groupSettingUpdate(from, "announcement")
            .then((res) => replyDeface(`*Group Taking a Break*\nBreak for ${args[0]}`))
            .catch((err) => replyDeface(mess.error.api))
            }
    break

    case 'kalkulator': case 'calculator':
        case 'cal': case 'kal': case 'hasil':
            if (!q) return reply(usgkalkulator)
            .then((res) => repky(myres.resusgkalkulator))
            var tteks = `${Math_js.evaluate(q)}`
            replyDeface(tteks)
    break

    case 'p':
        case 'proses':
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            if (isPricelist) return reply(mess.GroupPricelist)
            let proses = `${mono}🌀 Status Proses
⏰ ${jam}
📆 ${tanggalid}${mono}

📝 Pesanan :
${rm.quoted.text}

*Pesanan @${rm.quoted.sender.split("@")[0]} sedang dikirim oleh Admin ${pushname}*`
            const getTextP = getTextSetProses(from, set_proses);
            if (getTextP !== undefined) {
                mentions(getTextP.replace('#order', rm.quoted.text).replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('@buyer', `@${rm.quoted.sender.split("@")[0]}`).replace('#clock', jam).replace('#date', tanggal).replace('#dateid', tanggalid), [rm.quoted.sender], true);
            } else {
                mentions(proses, [rm.quoted.sender], true)
            }
    break

    case 'd':
        case 'done':
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            if (isPricelist) return reply(mess.GroupPricelist)
            let sukses = `${mono}🌀 Status : Sukses
⏰ ${jam}
📆 ${tanggalid}${mono}

*Pesanan @${rm.quoted.sender.split("@")[0]} telah dikirim oleh Admin ${pushname}*`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
                mentions(getTextD.replace('#order', rm.quoted.text).replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('@buyer', `@${rm.quoted.sender.split("@")[0]}`).replace('#clock', jam).replace('#date', tanggal).replace('#dateid', tanggalid), [rm.quoted.sender], true);
            } else {
                mentions(sukses, [rm.quoted.sender], true)
            }
    break

    case 'setproses':
        case 'setp':
            if (isPricelist) return reply(mess.GroupPricelist)
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetproses)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*@buyer*  : tag pembeli\n\n*#order*  : pesanan pembeli\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#dateid*  : ${tanggalid}`))
            if (isSetProses(from, set_proses)) return replyDeface(myres.order.avlsetproses)
            addSetProses(q, from, set_proses)
            replyDeface(myres.order.succsetproses)
    break

    case 'changeproses': case 'changep':
        case 'updateproses': case 'updproses':
            if (isPricelist) return reply(mess.GroupPricelist)
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetproses)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*@buyer*  : tag pembeli\n\n*#order*  : pesanan pembeli\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#dateid*  : ${tanggalid}`))
            if (isSetProses(from, set_proses)) {
                changeSetProses(q, from, set_proses)
                replyDeface(myres.order.succupdproses)
            } else {
                addSetProses(q, from, set_proses)
                replyDeface(myres.order.succupdproses)
            }
    break

    case 'getproses':
        case 'getp': case 'cekproses': case 'cekp':
            case 'checkproses': case 'checkp':
            if (isPricelist) return reply(mess.GroupPricelist)
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!isSetProses(from, set_proses)) return reply(myres.order.nogetproses)
                replyDeface(`*Text Set Proses*\n\n${getTextSetProses(from, set_proses)}`)  
    break

    case 'resetproses':
            if (isPricelist) return reply(mess.GroupPricelist)
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!isSetProses(from, set_proses)) return replyDeface(myres.order.noresetproses)
            removeSetProses(from, set_proses)
                replyDeface(myres.order.succresetproses)
    break

    case 'setdone':
        case 'setd':
            if (isPricelist) return reply(mess.GroupPricelist)
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetdone)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*@buyer*  : tag pembeli\n\n*#order*  : pesanan pembeli\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#dateid*  : ${tanggalid}`))
            if (isSetDone(from, set_done)) return replyDeface(myres.order.avlsetdone)
            addSetDone(q, from, set_done)
            replyDeface(myres.order.succsetdone)
    break

    case 'changedone': case 'changed':
        case 'updatedone': case 'upddone':
            if (isPricelist) return reply(mess.GroupPricelist)
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetdone)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*@buyer*  : tag pembeli\n\n*#order*  : pesanan pembeli\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#dateid*  : ${tanggalid}`))
            if (isSetDone(from, set_done)) {
                changeSetDone(q, from, set_done)
                replyDeface(myres.order.succupddone)
            } else {
                addSetDone(q, from, set_done)
                replyDeface(myres.order.succupddone)
            }
    break

    case 'getdone':
        case 'getd': case 'cekdone': case 'cekd':
            case 'checkdone': case 'checkd':
            if (isPricelist) return reply(mess.GroupPricelist)
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!isSetDone(from, set_done)) return reply(myres.order.nogetdone)
                replyDeface(`*Text Set Done*\n\n${getTextSetDone(from, set_done)}`)
    break

    case 'resetdone':
            if (isPricelist) return reply(mess.GroupPricelist)
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!isSetDone(from, set_done)) return replyDeface(myres.order.noresetdone)
            removeSetDone(from, set_done)
            replyDeface(myres.order.succresetdone)
    break

    case 'setbot':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetbot)
            if (isSetBot(from, set_bot)) return replyDeface(myres.setbot.avlsetbot)
            addSetBot(q, from, set_bot)
            replyDeface(myres.setbot.succsetbot)
    break

    case 'changebot': case 'updatesetbot':
        case 'updsetbot': case 'changesetbot':
            case 'updbot': case 'updsetbot':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetbot)
            if (isSetBot(from, set_bot)) {
                changeSetBot(q, from, set_bot)
                replyDeface(myres.setbot.succupdsetbot)
            } else {
                addSetBot(q, from, set_bot)
                replyDeface(myres.setbot.succupdsetbot)
            }
    break

    case 'resetbot':
        case 'delsetbot': case 'delsetb':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!isSetBot(from, set_bot)) return replyDeface(myres.setbot.noresetbot)
            removeSetBot(from, set_bot)
            replyDeface(myres.setbot.succresetbot)
    break

    case 'add':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins) return replyDeface(mess.GroupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (groupMembers.length == 512) return reply(myres.add.max)
            if (q.startsWith('08')) return reply(myres.add.notcode)
            var mems = []
            groupMembers.map( i => mems.push(i.id) )
            var number;
            if (args.length > 0) {
                number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
                var cek = await FiizuBot.onWhatsApp(number)
                if (cek.length == 0) return reply(myres.add.invalid)
                if (mems.includes(number)) return reply(myres.add.inhere)
                FiizuBot.groupParticipantsUpdate(from, [number], "add")
            } else if (m.isQuotedMsg) {
                number = m.quotedMsg.sender
                var cek = await FiizuBot.onWhatsApp(number)
                if (cek.length == 0) return reply(myres.add.notregist)
                if (mems.includes(number)) return reply(myres.add.inhere)
                FiizuBot.groupParticipantsUpdate(from, [number], "add")
            } else {
                replyDeface(usgaddjs)
            }
    break

    case 'kick':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins) return replyDeface(mess.GroupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                FiizuBot.groupParticipantsUpdate(from, [number], "remove")
            } else if (rm.quoted) {
                number = m.quotedMsg.sender
                FiizuBot.groupParticipantsUpdate(from, [number], "remove")
            } else {
                replyDeface(usgkickjs)
            }
    break

    case 'addadmn':
        case 'addadmin': case 'addadm':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins) return replyDeface(mess.GroupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                FiizuBot.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                .then( res => { mentions(`*Hey @${m.quotedMsg.sender.split("@")[0]}*\nYoure now admin`, [mentionUser[0]], true) })
                .catch(() => replyDeface(mess.error.api))
            } else if (m.isQuotedMsg) {
                FiizuBot.groupParticipantsUpdate(from, [m.quotedMsg.sender], "promote")
                .then( res => { mentions(`*Hey @${m.quotedMsg.sender.split("@")[0]}*\nYoure now admin`, [m.quotedMsg.sender], true) })
                .catch(() => replyDeface(mess.error.api))
            } else {
                replyDeface(usgaddadmnjs)
            }
    break

    case 'deladmn':
        case 'deladmin': case 'deladm':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins) return replyDeface(mess.GroupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                FiizuBot.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                .then( res => { mentions(`*Hey @${mentionUser[0].split("@")[0]}*\nYoure now a member`, [mentionUser[0]], true) })
                .catch(() => replyDeface(mess.error.api))
            } else if (m.isQuotedMsg) {
                FiizuBot.groupParticipantsUpdate(from, [m.quotedMsg.sender], "demote")
                .then( res => { mentions(`*Hey @${mentionUser[0].split("@")[0]}*\nYoure now a member`, [m.quotedMsg.sender], true) })
                .catch(() => replyDeface(mess.error.api))
            } else {
                replyDeface(usgdeladmnjs)
            }
    break
        
    case 'owner': case 'creator':
        case 'own': case 'sewa': case 'crtr':
            case 'sewabot': case 'rent': case 'rental':
            replyDeface(myres.txtowner)
            .then((res) => sendContact(from, ownnumber.split('@s.whatsapp.net')[0], ownerName))
    break

    case 'getlink':
        case 'glink':
            if (!isOwner) return reply(mess.OnlyOwner)
            if(!q)return reply(myres.txtgetlink)
            var linkgc = await FiizuBot.groupInviteCode(`${q}`)
            replyDeface('https://chat.whatsapp.com/'+linkgc)
    break

    case 'addrent':
        case 'addr':
            if (!isOwner) return 
            if (!q) return 
            if (!isUrl(args[0])) return replyDeface(mess.error.Iv)
            var url = args[0]
            url = url.split('https://chat.whatsapp.com/')[1]
            if (!args[1]) return replyDeface(myres.rental.notimerent)
            var data = await FiizuBot.groupAcceptInvite(url)
            if (_sewa.checkSewaGroup(data, sewa)) return replyDeface(myres.rental.isrented)
            _sewa.addSewaGroup(data, args[1], sewa)
            replyDeface(myres.rental.succrent)
    break

    case 'renttime':
        case 'rtime':
              if (!isOwner) return reply(mess.OnlyOwner)
              if (!q) return reply(usgaddtime)
              _sewa.addSewaGroup(from, args[1], sewa)
              replyDeface(myres.txtaddtime)
    break

    case 'stoprent':
        case 'stopr':
              if (!isOwner) return replyDeface(mess.OnlyOwner)
              if (!isGroup) return replyDeface(mess.OnlyGroup)
              if (!isSewa) return replyDeface(myres.rental.norent)
              sewa.splice(_sewa.getSewaPosition(from, sewa), 1)
              fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
              replyDeface(myres.rental.succstoprent)
    break

    case 'stoprentlink':
        case 'stoprlink':
            if (!isOwner) return replyDeface(mess.OnlyOwner)
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isSewa) return replyDeface(myres.rental.norent)
            if (!isUrl(args[0])) return replyDeface(mess.error.Iv)
            sewa.splice(_sewa.getSewaPosition(args[0], sewa), 1)
            fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
            replyDeface(myres.rental.succstoprent)
    break

    case 'cekrent':
        case 'checksewa': case 'rentcheck':
            case 'ceksewa': case 'cekrent':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isSewa) return replyDeface(myres.rental.norent)
            let rentcheck = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
            let sewanya = `*⏳〡Remaining time*\n${rentcheck.days} days, ${rentcheck.hours} hours, ${rentcheck.minutes} minutes, ${rentcheck.seconds} seconds`
            replyDeface(sewanya)
    break

    case 'listsewa':
        case 'rentlist':
            if (!isOwner) return replyDeface(mess.OnlyOwner)
            let txt = `*List of Rentals*\n*Total* ${sewa.length}`
            let data_array = [];
            for (let i of sewa) {
            let data_renter = await FiizuBot.groupMetadata(i.id)
            var renter = data_renter.owner
                data_array.push(i.id)
                    txt += `\n\n*🍬 ${await getGcName(i.id)}*\n_${i.id}_\n`
            if (i.expired === 'PERMANENT') {
            let rentcheck = 'PERMANENT'
                    txt += `Lifetime`
            } else {
            let rentcheck = ms(i.expired - Date.now())
                    txt += `${rentcheck.days} days, ${rentcheck.hours} hours, ${rentcheck.minutes} minutes, ${rentcheck.seconds} seconds_\n${renter ? renter.split("@")[0] : "Unknown"}`
                }
            }
                replyDeface(txt)
    break

    case 'rbc':
        case 'rentalbroadcast': case 'rentbc':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (args.length < 1) return reply(usgbc)
            for (let i of sewa) {
            let bttnbcs = [{buttonId: `.homepage`, buttonText: { displayText: "Home" }, type: 1 }, {buttonId: `.shop`, buttonText: { displayText: "List" }, type: 1 }]
            FiizuBot.sendMessage(i.id, { text: q, buttons: bttnbcs, footer: `~Fiizu`})
            }
            replyDeface(`*✅〡Successfully sent to ${sewa.length} rental groups*`)
    break

    case 'groupicon':
        case 'gcicon':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (isImage || isQuotedImage) {
            var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
            if (args[0] == '-lo‎n‎g') {
            	var { img } = await generateProfilePicture(media)
            	await FiizuBot.query({
                    tag: 'iq',
                    attrs: {
                        to: from,
                        type:'set',
                        xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    } 
                    ]
                })
                fs.unlinkSync(media)
            	replyDeface(myres.setgc.succpicgc)
            } else {
                await FiizuBot.updateProfilePicture(from, { url: media })
                .then( res => {
                    replyDeface(myres.setgc.succpicgc)
                    fs.unlinkSync(media)
                }).catch(() => replyDeface(mess.error.api))
            }
            } else {
			    replyDeface(usgpicgc)
            }
    break

    case 'groupname':
        case 'gcname':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (args.length < 1) return replyDeface(usgdessubgc)
            await FiizuBot.groupUpdateSubject(from, q)
            .then( res => {
                replyDeface(myres.setgc.succsubgc)
            }).catch(() => replyDeface(mess.error.api))
    break

    case 'groupdesc':
        case 'groupdes': case 'group description':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            if (args.length < 1) return replyDeface(usgdessubgc)
            await FiizuBot.groupUpdateDescription(from, q)
            .then( res => {
                replyDeface(myres.setgc.succdesgc)
            }).catch(() => replyDeface(mess.error.api))
    break

    case 'chang‎elink':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins) return replyDeface(mess.GroupAdmin)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            await FiizuBot.groupRevokeInvite(from)
            .then( res => {
                replyDeface(myres.setgc.succchangelink)
            }).catch(() => replyDeface(mess.error.api))
    break
        
    case 'changelink':
        case 'changelinkgc':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            let txsetl =`${mono}Are you sure to change the group link?${mono}`
            var bttnsetl = [{buttonId: `Cancel`, buttonText: { displayText: "Cancel" }, type: 1 },
            {buttonId: `.chang‎elink`, buttonText: { displayText: "Yes" }, type: 1 }]
            FiizuBot.sendMessage(from, { text: txsetl, buttons: bttnsetl, mentions: [sender] })
    break
        
    case 'h':
        case 'hidetag':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            let mem = [];
            groupMembers.map( i => mem.push(i.id) )
            FiizuBot.sendMessage(from, { text: q ? q : ' ', mentions: mem }, { quoted: m })
    break

    case 'del': case 'del': case 'delete':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!m.isQuotedMsg) return replyDeface(myres.deletechat.noreplydelete)
            if (!m.quotedMsg.fromMe) return replyDeface(myres.deletechat.replyme)
            FiizuBot.sendMessage(from, { delete: { fromMe: true, id: m.quotedMsg.id, remoteJid: from }})
    break
        
/*        case 'welc‎ome':
                    if (!isGroup) return reply(mess.OnlyGroup)
					if (!isOwner && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (args[1] === "1") {
					if (isWelcome) return reply(myres.welcome.avlwelcome)
					welcome.push(from)
					fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
					reply(myres.welcome.succwelcome)
					} else if (args[1] === "0") {
					if (!isWelcome) return reply(myres.welcome.avloffwelcome)
					let anu1 = antiwame.indexOf(from)
					welcome.splice(anu1, 1)
					fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
					reply(myres.welcome.succoffwelcome)
					} else {
					reply(' ')
					}
		break

        case 'lea‎ve':
                    if (!isGroup) return reply(mess.OnlyGroup)
					if (!isOwner && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (Number(args[0]) === 1) {
					if (isLeft) return reply(myres.leave.avlleave)
					left.push(from)
					fs.writeFileSync('./database/left.json', JSON.stringify(left))
					reply(myres.leave.succleave)
					} else if (Number(args[0]) === 0) {
					if (!isLeft) return reply(myres.leave.avloffleave)
					let anu1 = antiwame.indexOf(from)
					left.splice(anu1, 1)
					fs.writeFileSync('./database/left.json', JSON.stringify(left))
					reply(myres.leave.succoffleave)
					} else {
					reply(' ')
					}
		break

        case 'welcome':
                    if (!isGroup) return reply(mess.OnlyGroup)
                    if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
                    let txwelc =`${mono}Welcome Message${mono}`
                    var bttnwelc = [{buttonId: `.welc‎ome 0`, buttonText: { displayText: "Turn off" }, type: 1 },
                    {buttonId: `.welc‎ome 1`, buttonText: { displayText: "Turn on" }, type: 1 }]
                    FiizuBot.sendMessage(from, { text: txwelc, buttons: bttnwelc, mentions: [sender] })
        break
        
        case 'leave':
            case 'left':
                    if (!isGroup) return reply(mess.OnlyGroup)
                    if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
                    let txleft =`${mono}Leave Message${mono}`
                    var bttnleft = [{buttonId: `.lea‎ve 0`, buttonText: { displayText: "Turn off" }, type: 1 },
                    {buttonId: `.lea‎ve 1`, buttonText: { displayText: "Turn on" }, type: 1 }]
                    FiizuBot.sendMessage(from, { text: txleft, buttons: bttnleft, mentions: [sender] })
        break
        
        case 'shop‎mode':
                    if (!isGroup) return reply(mess.OnlyGroup)
					if (!isOwner) return reply(mess.GroupAdmin)
					if (!q) return reply(` `)
					if (Number(args[0]) === 0) {
					if (isPricelist) return reply(myres.shopmode.avlshopmode)
					pricelist.push(from)
					fs.writeFileSync('./database/pricelist.json', JSON.stringify(pricelist))
					replyDeface(myres.shopmode.succshopmode)
					} else if (Number(args[0]) === 1) {
					if (!isPricelist) return reply(myres.shopmode.avloffshopmode)
					let anu1 = pricelist.indexOf(from)
					pricelist.splice(anu1, 1)
					fs.writeFileSync('./database/pricelist.json', JSON.stringify(pricelist))
					replyDeface(myres.shopmode.succoffshopmode)
					} else {
					reply(' ')
					}
		break

        case 'shopmode':
                    if (!isGroup) return reply(mess.OnlyGroup)
			        if (!isOwner) return reply(mess.GroupAdmin)
                    let txshopmode =`${mono}Shop Mode${mono}`
                    var bttnshopmode = [{buttonId: `.shop‎mode 0`, buttonText: { displayText: "Turn off" }, type: 1 },
                    {buttonId: `.shop‎mode 1`, buttonText: { displayText: "Turn on" }, type: 1 }]
                    FiizuBot.sendMessage(from, { text: txshopmode, buttons: bttnshopmode, mentions: [sender] })
        break*/

        case 'anti‎link':
                    if (!isGroup) return reply(mess.OnlyGroup)
					if (!isOwner && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (!isBotGroupAdmins) return reply(mess.BotAdmin)
					if (!q) return reply(` `)
					if (Number(args[0]) === 1) {
					if (isAntiLink) return reply(myres.antilink.avlantilink)
					antilink.push(from)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
					replyDeface(myres.antilink.succantilink)
					} else if (Number(args[0]) === 0) {
					if (!isAntiLink) return reply(myres.antilink.avloffantilink)
					let anu1 = antilink.indexOf(from)
					antilink.splice(anu1, 1)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
					replyDeface(myres.antilink.succoffantilink)
					} else {
					reply(' ')
					}
		break

        case 'antilink':
                    if (!isGroup) return reply(mess.OnlyGroup)
				    if (!isOwner && !isGroupAdmins) return reply(mess.GroupAdmin)
                    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                    let txantilink =`${mono}Antilink${mono}`
                    var bttnantilink = [{buttonId: `.anti‎link 0`, buttonText: { displayText: "Turn off" }, type: 1 },
                    {buttonId: `.anti‎link 1`, buttonText: { displayText: "Turn on" }, type: 1 }]
                    FiizuBot.sendMessage(from, { text: txantilink, buttons: bttnantilink, mentions: [sender] })
        break

        case 'antilink‎all':
                    if (!isGroup) return reply(mess.OnlyGroup)
				    if (!isOwner && !isGroupAdmins) return reply(mess.GroupAdmin)
                    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
					if (!q) return reply(` `)
					if (Number(args[0]) === 1) {
					if (isAntiLinkAll) return reply(myres.antilink.avlantilinkall)
					antilinkall.push(from)
					fs.writeFileSync('./database/antilinkall.json', JSON.stringify(antilinkall))
					replyDeface(myres.antilink.succantilinkall)
					} else if (Number(args[0]) === 0) {
					if (!isAntiLinkAll) return reply(myres.antilink.avloffantilinkall)
					let anu1 = antilink.indexOf(from)
					antilinkall.splice(anu1, 1)
					fs.writeFileSync('./database/antilinkall.json', JSON.stringify(antilinkall))
					replyDeface(myres.antilink.succoffantilinkall)
					} else {
					reply(' ')
					}
        break

        case 'antialllink':
            case 'antilinkall':
                if (!isGroup) return reply(mess.OnlyGroup)
				if (!isOwner && !isGroupAdmins) return reply(mess.GroupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                let txantilinkall =`${mono}Anti All Links${mono}`
                var bttnantilinkall = [{buttonId: `.antilink‎all 0`, buttonText: { displayText: "Turn off" }, type: 1 },
                {buttonId: `.antilink‎all 1`, buttonText: { displayText: "Turn on" }, type: 1 }]
                FiizuBot.sendMessage(from, { text: txantilinkall, buttons: bttnantilinkall, mentions: [sender] })
        break
				
        case 'anti‎wame':
                if (!isGroup) return reply(mess.OnlyGroup)
				if (!isOwner && !isGroupAdmins) return reply(mess.GroupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (!q) return reply(` `)
				if (Number(args[0]) === 1) {
				if (isAntiWame) return reply(myres.antilink.avlantiwame)
				antiwame.push(from)
				fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
					replyDeface(myres.antilink.succantiwame)
				} else if (Number(args[0]) === 0) {
				if (!isAntiWame) return reply(myres.antilink.avloffantiwame)
				let anu1 = antiwame.indexOf(from)
				antiwame.splice(anu1, 1)
				fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
				    replyDeface(myres.antilink.succoffantiwame)
				} else {
				    reply(' ')
                }
    break

    case 'antiwame':
                if (!isGroup) return reply(mess.OnlyGroup)
				if (!isOwner && !isGroupAdmins) return reply(mess.GroupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                let txantiwame =`${mono}Anti Wa.me${mono}`
                var bttnantiwame = [{buttonId: `.anti‎wame 0`, buttonText: { displayText: "Turn off" }, type: 1 },
                {buttonId: `.anti‎wame 1`, buttonText: { displayText: "Turn on" }, type: 1 }]
                FiizuBot.sendMessage(from, { text: txantiwame, buttons: bttnantiwame, mentions: [sender] })
    break

    case 'open':
        case 'buka':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            FiizuBot.groupSettingUpdate(from, 'not_announcement')
            .then((res) => {
            let opengc = `${mono}🎊 Grup Buka
📆 ${tanggalid}
⏰ ${jam}${mono}

*${groupName}*
*Telah Di Buka Kembali Oleh Admin ${pushname}*`
            const tettOpen = getTextSetOpen(from, set_open);
            if (tettOpen !== undefined) {
            mentions(tettOpen.replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('#time', `${emojiWaktu} ${waktu}`).replace('#time2', `${waktu} ${emojiWaktu}`).replace('#group', groupName).replace('#clock', jam).replace('#date', tanggal).replace('#dateid', tanggalid), [sender], true);
            } else {
            mentions(opengc, [sender], true)
            }
            })
    break

    case 'close':
        case 'tutup':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
		    if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
		    if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
		    FiizuBot.groupSettingUpdate(from, 'announcement')
		    .then((res) => {
			let closegc = `${mono}🎊 Grup Tutup
📆 ${tanggalid}
⏰ ${jam}${mono}

*${groupName}*
*Sedang Di Tutup Sementara Oleh Admin ${pushname}*`
            const textClose = getTextSetClose(from, set_close);
            if (textClose !== undefined) {
            mentions(textClose.replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('#time', `${emojiWaktu} ${waktu}`).replace('#time2', `${waktu} ${emojiWaktu}`).replace('#group', groupName).replace('#clock', jam).replace('#date', tanggal).replace('#dateid', tanggalid), [sender], true);
            } else {
            mentions(closegc, [sender], true)
            }
            })
    break

    case 'setopen':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetopen)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*#time*  : ${emojiWaktu} ${waktu}\n\n*#time2*  : ${waktu} ${emojiWaktu}\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#dateid*  : ${tanggalid}`))
            if (isSetOpen(from, set_open)) return replyDeface(myres.open.avlsetopen)
            addSetOpen(q, from, set_open)
            replyDeface(myres.open.succsetopen)
    break

    case 'updateopen':
        case 'changeopen': case 'updopen':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetopen)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*#time*  : ${emojiWaktu} ${waktu}\n\n*#time2*  : ${waktu} ${emojiWaktu}\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#dateid*  : ${tanggalid}`))
            if (isSetOpen(from, set_open)) {
                changeSetOpen(q, from, set_open)
                replyDeface(myres.open.succupdopen)
            } else {
                addSetOpen(q, from, set_open)
                replyDeface(myres.open.succupdopen)
            }
    break

    case 'getopen':
        case 'cekopen': case 'checkopen':
            case 'ceko': case 'checko':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (!isSetOpen(from, set_open)) return reply(myres.open.nogetopen)
            replyDeface(`*Text Set Open*\n\n${getTextSetOpen(from, set_open)}`)
    break

    case 'resetopen':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!isSetOpen(from, set_open)) return replyDeface(myres.open.nosetopen)
            removeSetOpen(from, set_open)
            replyDeface(myres.open.succresetopen)
            break

    case 'setclose':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetclose)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*#time*  : ${emojiWaktu} ${waktu}\n\n*#time2*  : ${waktu} ${emojiWaktu}\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#dateid*  : ${tanggalid}`))
            if (isSetClose(from, set_close)) return replyDeface(myres.close.avlsetclose)
            addSetClose(q, from, set_close)
            replyDeface(myres.close.succsetclose)
    break

    case 'updateclose':
        case 'changeclose': case 'updclose':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetclose)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*#time*  : ${emojiWaktu} ${waktu}\n\n*#time2*  : ${waktu} ${emojiWaktu}\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#dateid*  : ${tanggalid}`))
            if (isSetClose(from, set_close)) {
                changeSetClose(q, from, set_close)
                replyDeface(myres.close.succupdclose)
            } else {
                addSetClose(q, from, set_close)
                replyDeface(myres.close.succupdclose)
            }
    break

    case 'getclose':
        case 'cekclose': case 'checkclose':
            case 'cekc': case 'checkc':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner && !fromMe) return reply(mess.GroupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (!isSetClose(from, set_close)) return reply(myres.close.nogetclose)
            replyDeface(`*Text Set Close*\n\n${getTextSetClose(from, set_close)}`)
    break

    case 'ressetclose':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!isSetClose(from, set_close)) return replyDeface(myres.close.nosetclose)
            removeSetClose(from, set_close)
            replyDeface(myres.close.succresetclose)
    break

/*    case 'setwelcome':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetwelcome)
            .then((res) => repky(`*@name*  : tag partisipan\n\n*#group*  : nama grup\n\n*#des*  : deskripsi\n\n*#dateid*  : ${tanggalid}\n\n*#date*  : ${tanggal}\n\n*#clock*  : ${jam}\n\n*#time*  : ${waktu} ${emojiWaktu}\n\n*#timeid*  : ${waktuid} ${emojiWaktuid}`))
            if (isSetWelcome(from, set_welcome_db)) return replyDeface(myres.welcome.avlsetwelcome)
            addSetWelcome(q, from, set_welcome_db)
            replyDeface(myres.welcome.succsetwelcome)
    break

    case 'changewelcome':
        case 'updatewelcome': case 'updwelcome':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetwelcome)
            .then((res) => repky(`*@name*  : tag partisipan\n\n*#group*  : nama grup\n\n*#des*  : deskripsi\n\n*#dateid*  : ${tanggalid}\n\n*#date*  : ${tanggal}\n\n*#clock*  : ${jam}\n\n*#time*  : ${waktu} ${emojiWaktu}\n\n*#timeid*  : ${waktuid} ${emojiWaktuid}`))
            if (isSetWelcome(from, set_welcome_db)) {
                changeSetWelcome(q, from, set_welcome_db)
                replyDeface(myres.welcome.succupdwelcome)
            } else {
                addSetWelcome(q, from, set_welcome_db)
                replyDeface(myres.welcome.succupdwelcome)
            }
    break

    case 'getwelcome':
        case 'cekwelcome': case 'checkw':
            case 'cekw': case 'checkwelcome':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!isSetWelcome(from, set_welcome_db)) return reply(myres.welcome.nogetwelcome)
                replyDeface(`*Text Set Welcome*\n\n${getTextSetWelcome(from, set_welcome_db)}`)
    break

    case 'resetwelcome':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!isSetWelcome(from, set_welcome_db)) return replyDeface(myres.welcome.nosetwelcome)
            removeSetWelcome(from, set_welcome_db)
            replyDeface(myres.welcome.succresetwelcome)
    break

    case 'setleave':
        case 'setleft':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetleave)
            .then((res) => repky(`*@name*  : tag partisipan\n\n*#group*  : nama grup\n\n*#des*  : deskripsi\n\n*#dateid*  : ${tanggalid}\n\n*#date*  : ${tanggal}\n\n*#clock*  : ${jam}\n\n*#time*  : ${waktu} ${emojiWaktu}\n\n*#timeid*  : ${waktuid} ${emojiWaktuid}`))
            if (isSetLeft(from, set_left_db)) return replyDeface(myres.leave.avlsetleave)
            addSetLeft(q, from, set_left_db)
            replyDeface(myres.leave.succsetleave)
    break

    case 'changeleave': case 'updateleave': case 'updleave':
        case 'changeleft': case 'updateleft': case 'updleft':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!q) return replyDeface(usgsetleave)
            .then((res) => repky(`*@name*  : tag partisipan\n\n*#group*  : nama grup\n\n*#des*  : deskripsi\n\n*#dateid*  : ${tanggalid}\n\n*#date*  : ${tanggal}\n\n*#clock*  : ${jam}\n\n*#time*  : ${waktu} ${emojiWaktu}\n\n*#timeid*  : ${waktuid} ${emojiWaktuid}`))
            if (isSetLeft(from, set_left_db)) {
                changeSetLeft(q, from, set_left_db)
                replyDeface(myres.leave.succupdleave)
            } else {
                addSetLeft(q, from, set_left_db)
                replyDeface(myres.leave.succupdleave)
            }
    break

    case 'checkleave': case 'checkl': case 'checkleft':
        case 'getleave': case 'cekleave': case 'getleft': case 'cekleft':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GroupAdmin)
            if (!isSetWelcome(from, set_welcome_db)) return reply(myres.welcome.nogetleave)
                replyDeface(`*Text Set Leave*\n\n${getTextSetWelcome(from, set_welcome_db)}`)
    break

    case 'resetleft': case 'resetleave':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isGroupAdmins && !isOwner) return replyDeface(mess.GroupAdmin)
            if (!isSetLeft(from, set_left_db)) return replyDeface(myres.leave.nosetleave)
            removeSetLeft(from, set_left_db)
            replyDeface(myres.leave.succresetleave)
    break*/

    case 'linkgrup':
        case 'grouplink': case 'linkgc':
            case 'gclink':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            if (!isBotGroupAdmins) return replyDeface(mess.BotAdmin)
            var url = await FiizuBot.groupInviteCode(from).catch(() => replyDeface(mess.error.api))
            url = 'https://chat.whatsapp.com/'+url
            replyDeface(url)
    break

    case 'mygc': case 'grupbot':
        case 'mygrup': case 'mygroup': case 'gcbot':
            replyDefaceGc('Fiibot Group Chat')
    break

    case 'toimg': case 'toimage':
        case 'tovid': case 'tovideo':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (!isQuotedSticker) return replyDeface(myres.convert.noreplytoimg)
            var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
            var buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            var rand1 = 'temp/'+getRandom('.webp')
            var rand2 = 'temp/'+getRandom('.png')
            fs.writeFileSync(`./${rand1}`, buffer)
            if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                    fs.unlinkSync(`./${rand1}`)
                    if (err) return replyDeface(mess.error.api)
                    FiizuBot.sendMessage(from, { image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                    fs.unlinkSync(`./${rand2}`)
                })
            } else {
                replyDeface(mess.wait)
                webp2mp4File(`./${rand1}`).then(async(data) => {
                    fs.unlinkSync(`./${rand1}`)
                    FiizuBot.sendMessage(from, { video: await getBuffer(data.data) }, { quoted: msg })
                })
            }
    break

    case 'tomp3':
        case 'toaudio':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (isVideo || isQuotedVideo) {
                let media = await downloadAndSaveMediaMessage('video', `./temp/${sender}.mp4`)
                replyDeface(mess.wait)
                let ran = './temp/'+getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
                    fs.unlinkSync(media)
                    if (err) return replyDeface(mess.error.api)
                    FiizuBot.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `ConvertToMp3` }, { quoted: msg })
                    fs.unlinkSync(media)
                    fs.unlinkSync(ran)
                })
            } else {
                replyDeface(myres.convert.noreplytoaudio)
            }
    break

/*    case 'stext':
        case 'stickertext':
            if (!q) return reply(usgstickertext)
            if (q.length > 50) return reply(myres.sticker.textlong)
            var pth = await getBuffer(`https://api.xteam.xyz/ttp?file&text=${encodeURIComponent(q)}`)
            fs.writeFileSync(`./sticker/${sender}.png`, pth)
            var media = `./sticker/${sender}.png`
            await ffmpeg(`${media}`)
            .input(media)
            .on('start', function (cmd) {
            })
            .on('error', function (err) {
                console.log(`Error : ${err}`)
                fs.unlinkSync(media)
                reply(mess.error.api)
            })
            .on('end', function () {
                exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                    if (error) return reply(mess.error.api)
                    FiizuBot.sendMessage(from, { sticker: fs.readFileSync(`./sticker/${sender}.webp`) }, {quoted: msg})
                    
                    fs.unlinkSync(media)
                    fs.unlinkSync(`./sticker/${sender}.webp`)
                })
            })
            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(500,iw)':min'(500,ih)':force_original_aspect_ratio=decrease,fps=60, pad=500:500:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(`./sticker/${sender}.webp`)
    break

    case 'stext2':
        case 'stickertext2':
            if (!q) return reply(usgstickertext)
            if (q.length > 50) return reply(myres.sticker.textlong)
            var data = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
            var rand2 = 'sticker/'+getRandom('.webp')
            fs.writeFileSync(`./${rand2}`, data)
            exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                FiizuBot.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                fs.unlinkSync(`./${rand2}`)
            })
    break

    case 'emojimix':
        case 'mixemoji':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (args.length < 0) return replyDeface(usgemojimix)
            var emo1 = q.split("+")[0]
            var emo2 = q.split("+")[1]
            if (!isEmoji(emo1) || !isEmoji(emo2)) return replyDeface(myres.sticker.noemoji)
            fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emo1)}_${encodeURIComponent(emo2)}`)
            .then(data => {
                sendStickerFromUrl(from, data.results[0]. url, packname, author, { quoted: msg })
            }).catch((e) => replyDeface(mess.error.api))
    break

    case 's':
        case 'sticker': case 'stiker':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (!isImage && !isQuotedImage && !isVideo && !isQuotedVideo) return reply(usgsticker)
            var stream = await downloadContentFromMessage(msg.message[mediaType], mediaType.replace('Message', ''))
            let stickerStream = new PassThrough()
            if (isImage || isQuotedImage) {
                ffmpeg(stream)
                    .on('start', function (cmd) {
                    })
                    .on('error', function (err) {
                    })
                    .on('end', function () {
                    })
                    .addOutputOptions([
                        `-vcodec`,
                        `libwebp`,
                        `-vf`,
                        `scale='min(500,iw)':min'(500,ih)':force_original_aspect_ratio=decrease,fps=60, pad=500:500:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
                    ])
                    .toFormat('webp')
                    .writeToStream(stickerStream)
                sock.sendMessage(from, { sticker: { stream: stickerStream } })
            } else if (isVideo || isQuotedVideo) {
                ffmpeg(stream)
                    .on('start', function (cmd) {
                    })
                    .on('error', function (err) {
                    })
                    .on('end', async () => {
                        sock.sendMessage(from, { sticker: { url: `./temp/stickers/${sender}.webp` } }).then(() => {
                            fs.unlinkSync(`./temp/stickers/${sender}.webp`)
                        })
                    })
                    .addOutputOptions([
                        `-vcodec`,
                        `libwebp`,
                        `-vf`,
                        `scale='min(500,iw)':min'(500,ih)':force_original_aspect_ratio=decrease,fps=60, pad=500:500:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
                    ])
                    .toFormat('webp')
                    .save(`./temp/stickers/${sender}.webp`)
            }
    break

    case 'stele':
        case 'stickertelegram': case 'stikertelegram':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (!q) return replyDeface(usgsearchsticker)
            let stele = q
            xzons.Telesticker(stele)
            .then(result => {
            replyDeface(result)
            })
    break

    case 'sstc': case 'sstiker':
        case 'ssticker': case 'searchstiker':
            case 'searchsticker':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (!q) return replyDeface(usgsearchsticker)
            let sstc = q
            xzons.StickerSearch(sstc)
            .then(result => {
            replyDeface(result)
            })
    break

    case 'ff':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (!args[0]) return reply(usgidgame)
            if (!Number(args[0])) return reply(myres.notnumber)
            replyDeface(`*🆔〡Free fire ${q}*`)
            let dataff = await xzons.nickff(args.join(" "))
            var resultff = dataff.username
            repky(resultff)
    break*/

    case 'ml':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            var idml = q.split(".")[0]
            var mlserver = q.split(".")[1]                
            if (!q) return reply(usgidserver)
            if (!Number(idml) && !Number(mlserver)) return reply(myres.notnumber)
            replyDeface(`*🆔〡Mobile legend ${q}*`)
            let dataml = await xzons.nickml(idml, mlserver)
            var resultml = dataml.userName
            repky(resultml)
    break

    case 'pubg':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (!q) return reply(usgidgame)
            replyDeface(`*🆔〡Pubg ${q}*`)
            axios.get(`https://api.lolhuman.xyz/api/pubg/${q}?apikey=${apikey}`)
            .then(({data}) => {
            let resultpubg = data.result
            repky(resultpubg)
            })
            .catch((err) => {
            reply(mess.error.api)
            })
    break

    case 'higgs': case 'higg':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (!q) return reply(usgidgame)
            replyDeface(`*🆔〡Higgs domino ${q}*`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/higghdomino/${q}?apikey=${apikey}`)
                repklyDeface(data.result)
    break

    case 'codm':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (!q) return reply(usgidgame)
            replyDeface(`*🆔〡Codm ${q}*`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/codm/${q}?apikey=${apikey}`)
         	repky(data.result)
    break

    case 'sausage':
            if (!isGroup) return replyDefaceGc(mess.GroupMode)
            if (!q) return reply(usgidgame)
            replyDeface(`*🆔〡Sausage ${q}*`)
            var { data } = await axios.get(`https://api.lolhuman.xyz/api/sausageman/${q}?apikey=${apikey}`)
         	repky(data.result)
    break

    case 'listadmin':
            if (!isGroup) return replyDeface(mess.OnlyGroup)
            let teks = `*${groupMetadata.subject}*\nTotal ${groupAdmins.length} admin\n\n`
            let no = 0
            for (let admon of groupAdmins) {
            no += 1
            teks += `[ ${no.toString()} ] @${admon.split('@')[0]}\n`
            }
            mentions(teks, groupAdmins, true)
    break

    case 'pichome':
            if (!isOwner) return reply(mess.OnlyOwner)
            let medifa = await downloadAndSaveMediaMessage('image', `./temp/logo.png`)
            replyDeface(myres.succpichome)
    break

    case 'vidhome':
            if (!isOwner) return reply(mess.OnlyOwner)
            let mediaa = await downloadAndSaveMediaMessage('video', `./temp/FiizuBot.mp4`)
            replyDeface(myres.succvidhome)
    break

    case 'join':
            if (!isOwner) return 
            if (!q) return 
            if (!isUrl(args[0])) return replyDeface(mess.error.Iv)
            var url = args[0]
            url = url.split('https://chat.whatsapp.com/')[1]
            var data = await FiizuBot.groupAcceptInvite(url)
            replyDeface(jsonformat(data))
    break

    case 'searchgc': case 'sgc':
            if (!isOwner) return reply(mess.OnlyOwner)
            let gcname = q
            xzons.linkwa(gcname)
            .then(result => {
            replyDeface(result)
            })
    break

    case 'gid': case 'groupid':
            if (!isGroup) return reply(mess.OnlyGroup)
            if (!isOwner) return reply(mess.OnlyOwner)
            replyDeface(from)
    break

    case 'searchgid': case 'sgid':
            if (!isOwner) return reply(mess.OnlyOwner)
            let data_name = await FiizuBot.groupMetadata(q)
            let data_owner = await FiizuBot.groupMetadata(q)
            var aowner = data_owner.owner
            return replyDeface(data_name.subject)
            .then((res) => repky(`@${aowner ? aowner.split("@")[0] : 'Tidak diketahui'}`))
    break

    case 'crgc':
        case 'crtgc': case 'creategc':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (!q) return reply(`${command} <nama grup>`)
            var gname = q
            let create = await FiizuBot.groupCreate(gname, [])
            let gcode = await FiizuBot.groupInviteCode(create.id)
            replyDeface(`*🔰 Name  :*  ${create.subject}
*👑 Admin  :*  @${create.owner.split("@")[0]}
*📆 Date  :*  ${tanggal}
*⏰ Time  :*  ${jam}

*🔗 Group link  :*  _https://chat.whatsapp.com/${gcode}_`)
    break

    case 'spamto':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (!q.includes('@')) return reply(myres.spamto.noat)
            if (q.startsWith('08')) return reply(myres.spamto.spamnocode)
            if (q.startsWith('+')) return reply(myres.spamto.noplus)
            FiizuBot.sendMessage(q, {text: `   \n`.repeat(100)})
            .then((res) => FiizuBot.sendMessage(q, {text: `   \n`.repeat(100)}))
            .then((res) => FiizuBot.sendMessage(q, {text: `   \n`.repeat(100)}))
            .then((res) => FiizuBot.sendMessage(q, {text: `   \n`.repeat(100)}))
            .then((res) => FiizuBot.sendMessage(q, {text: `   \n`.repeat(100)}))
            .then((res) => FiizuBot.sendMessage(q, {text: `   \n`.repeat(100)}))
            .then((res) => replyDeface(myres.spamto.succspamto))
    break

    case 'bot':
        case 'bit': case 'bpt':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            let getTextBot = getTextSetBot(from, set_bot);
            if (getTextBot == undefined) {
            let txtbott = getTextBot
            var rows = [
                { title: '▶️ List', rowId: `.shop` },
                { title: '▶️ Profile', rowId: `.profile` },
                { title: '▶️ Creator', rowId: `.crtr` },
                { title: '▶️ Fiibot Homepage', rowId: `.home` },
            ]
            let buttbot = { text: txtbott, buttonText: myres.list.txtbuttlist, mentions: [sender], sections: [{title: '[ FiizuBot ]  Onlineshop Bot', rows: rows}]
            }
            FiizuBot.sendMessage(from, buttbot)
            } else {
            var rows = [
                { title: '▶️ List', rowId: `.shop` },
                { title: '▶️ Profile', rowId: `.profile` },
                { title: '▶️ Creator', rowId: `.crtr` },
                { title: '▶️ Fiibot Homepage', rowId: `.home` },
            ]
            let bttnbott = { text: ` ${mono}Can i help u ?${mono}`, buttonText: myres.list.txtbuttlist, mentions: [sender], sections: [{title: '[ FiizuBot ]  Onlineshop Bot', rows: rows}]
            }
            FiizuBot.sendMessage(from, bttnbott)
            }
    break

    default:
        if ((budy) && ["p", "Proses", "P"].includes(budy) && !isCmd) {
            if (!isGroup) return reply(mess.NoReply)
            if (!isOwner && !isGroupAdmins) return
            let proses = `${mono}🌀 Status Proses
⏰ ${jam}
📆 ${tanggalid}${mono}

📝 Pesanan :
${rm.quoted.text}

*Pesanan @${rm.quoted.sender.split("@")[0]} sedang dikirim oleh Admin ${pushname}*`
            const getTextP = getTextSetProses(from, set_proses);
            if (getTextP !== undefined) {
            mentions(getTextP.replace('#order', rm.quoted.text).replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('@buyer', `@${rm.quoted.sender.split("@")[0]}`).replace('#clock', jam).replace('#date', tanggal).replace('#dateid', tanggalid), [rm.quoted.sender], true);
            } else {
            mentions(proses, [rm.quoted.sender], true)
            }
            }

        if ((budy) && ["d", "Done", "D"].includes(budy) && !isCmd) {
            if (!isGroup) return reply(mess.reply)
            if (!isOwner && !isGroupAdmins) return
            let sukses = `${mono}🌀 Status : Sukses
⏰ ${jam}
📆 ${tanggalid}${mono}

*Pesanan @${rm.quoted.sender.split("@")[0]} telah dikirim oleh Admin ${pushname}*`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
            mentions(getTextD.replace('#order', rm.quoted.text).replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('@buyer', `@${rm.quoted.sender.split("@")[0]}`).replace('#clock', jam).replace('#date', tanggal).replace('#dateid', tanggalid), [rm.quoted.sender], true);
            } else {
            mentions(sukses, [rm.quoted.sender], true)
            }
            
        }
    }
}