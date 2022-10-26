"use strict";
const { WASocket, proto, getContentType, downloadContentFromMessage, decodeJid, generateWAMessageFromContent, generateWAMessage } = require('@adiwajshing/baileys');
const axios = require('axios').default
const hikki = require("hikki-me");
const now = require("performance-now");
const { PassThrough } = require('stream');
const moment = require('moment-timezone');
const ffmpeg = require('fluent-ffmpeg');
const FormData = require('form-data');
const chalk = require('chalk');
const fs = require('fs');
const Math_js = require('mathjs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ms = require('parse-ms');
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

//lib/utils
const _sewa = require("../utils/sewa");
const afkg = require("../utils/afk");
const { addResponList, delResponList, resetListAll, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, renameKeyList, getDataResponList } = require('../utils/respon-list');
const { addPayment, getPayment, alreadyPayment, sendPayment, alreadyGPayment, updatePayment } = require('../utils/fiibot_payment');
const { allMenu, fiizumenu, txtprofile } = require('../utils/fiibot_home.js')
const { FiizuBotusgaddlist, FiizuBotusgaddfiipay, FiizuBotusgdellist, FiizuBotusgupdlist, FiizuBotusgrename, FiizuBotusgpause, FiizuBotusgcalculator, FiizuBotusgsetproses, FiizuBotusgsetdone,
FiizuBotusgsetbot, FiizuBotusgaddjs, FiizuBotusgkickjs, FiizuBotusgaddadmnjs, FiizuBotusgdeladmnjs, FiizuBotusgaddtime, FiizuBotusgpicgc, FiizuBotusgdessubgc, FiizuBotusgsetopen,
FiizuBotusgsetclose, FiizuBotusgsetwelcome, FiizuBotusgsetleave, FiizuBotusgstickertext, FiizuBotusgemojimix, FiizuBotusgidgame, FiizuBotusgidserver, FiizuBotusgbc, FiizuBotsuccsendbc,
FiizuBotusgjoin, FiizuBotusgsearchsticker } = require('../utils/fiibot_respond.js');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('../utils/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('../utils/setdone');
const { isSetOpen, addSetOpen, removeSetOpen, changeSetOpen, getTextSetOpen } = require("../utils/setopen");
const { isSetClose, addSetClose, removeSetClose, changeSetClose, getTextSetClose } = require("../utils/setclose");
const { isSetBot, addSetBot, removeSetBot, changeSetBot, getTextSetBot } = require('../utils/setbot');
const { serialize, runtime, getRandom, getBuffer, fetchJson, fetchText, getGroupAdmins, reSize, removeEmojis, calculate_age, sleep, url, makeid } = require("../utils/myfunc");
const { smsg, parseMention } = require('../utils/mysim');
const { isSetWelcome, addSetWelcome, removeSetWelcome, changeSetWelcome, getTextSetWelcome } = require('../utils/setwelcome');
const { isSetLeft, addSetLeft, removeSetLeft, changeSetLeft, getTextSetLeft } = require('../utils/setleft');
const { webp2mp4File } = require('../utils/convert');
let mess = JSON.parse(fs.readFileSync('./utils/mess.json'));
let myres = JSON.parse(fs.readFileSync('./utils/fiibot_response.json'));

let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let fiibot_payment = JSON.parse(fs.readFileSync('./database/fiibot_payment.json'));
let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));
let set_bot = JSON.parse(fs.readFileSync('./database/set_bot.json'));
let _afks = JSON.parse(fs.readFileSync('./database/afg.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
let set_open = JSON.parse(fs.readFileSync('./database/set_open.json'));
let set_close = JSON.parse(fs.readFileSync('./database/set_close.json'));
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let left = JSON.parse(fs.readFileSync('./database/left.json'));
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let pricelist = JSON.parse(fs.readFileSync('./database/pricelist.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let antilinkall = JSON.parse(fs.readFileSync('./database/antilinkall.json'))
let antivirtext = JSON.parse(fs.readFileSync('./database/antivirtext.json'));

const { FiibotRater, FiibotRatings, FiibotRatingsOne, FiibotRatingsTwo, FiibotRatingsThree, FiibotRatingsFour, FiibotRatingsFive } = require('../utils/fiibot_rating');
let _ratings = JSON.parse(fs.readFileSync('./database/fiibot_ratings.json'));
let _raters = JSON.parse(fs.readFileSync('./database/fiibot_rater.json'));
let one_star = JSON.parse(fs.readFileSync('./database/fiibot_ratingsOne.json'));
let two_stars = JSON.parse(fs.readFileSync('./database/fiibot_ratingsTwo.json'));
let three_stars = JSON.parse(fs.readFileSync('./database/fiibot_ratingsThree.json'));
let four_stars = JSON.parse(fs.readFileSync('./database/fiibot_ratingsFour.json'));
let five_stars = JSON.parse(fs.readFileSync('./database/fiibot_ratingsFive.json'));

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}
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

module.exports = async (sock, msg, m, rm) => {
    const { botnumb, ownerNumber, ownnumber, ownerName, sessionName, homelandscape, thumbhome, pathimg, groupIcon, logoafk, botName, owncek, footer } = require('../config.json')
    const extendedText = getContentType
    const FiizuBot = sock
    const mono = '```'
    m = serialize(sock, msg)
    rm = smsg(sock, msg)
    let homelands = fs.readFileSync(homelandscape)
    let urlhomelands = 'https://telegra.ph/file/638ad4078857fd35248cd.jpg'
    let pichomepage = fs.readFileSync(thumbhome)
    let thumb = fs.readFileSync(pathimg)
    let thum = fs.readFileSync(pathimg)
    let thumafk = fs.readFileSync(logoafk)
    let dev = ownerNumber
    const time = moment().tz('Asia/Jakarta').format('HH:mm:ss')
    const hari = moment().tz("Asia/Jakarta").format("dddd")
    const tanggal = moment().tz("Asia/Jakarta").format("dddd. ll")
    const tanggalid = moment().tz("Asia/Jakarta").locale('id').format("dddd, ll")
    var monthly = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var nwDate = new Date();
    var months = nwDate.getMonth();
    const aMonth = (monthly[months])
    const aDay = moment().tz("Asia/Jakarta").format("DD")
    const aYear = moment().tz("Asia/Jakarta").format("YYYY")
    const jam = moment().tz("Asia/Jakarta").locale('id').format("HH:mm:ss z")
    const _time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        if (_time == 'pagi') {
            var waktu = 'morning'
            var emojiWaktu = '🌤️'
        } else if (_time == 'siang') {
            var waktu = 'noon'
            var emojiWaktu = '🌤️'
        } else if (_time == 'sore') {
            var waktu = 'afternoon'
            var emojiWaktu = '🌤️'
        } else if (_time == 'malam') {
            var waktu = 'night'
            var emojiWaktu = '️🌙'
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
    const version = '3.9.0'
    const updateon = 'Oct 25, 2022'
    const releasedon = 'Jun 20, 2022'
    //const apikey = `joofficial1002`
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

    sock.readMessages([msg.key])
    FiizuBot.sendPresenceUpdate('available', from)

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
    const isFiibotGroupAdmins = groupMetadata && groupAdmins.includes(botId)
    const isFiizu = ownerNumber.includes(sender)
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
        const isAntiLink = antilink.includes(from) ? true : false
        const isAntiLinkAll = antilinkall.includes(from) ? true : false
        const isAntiWame = antiwame.includes(from) ? true : false
        const isAntiVirtext = antivirtext.includes(from) ? true : false
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
        
        if (!isCmd && isGroup && isAlreadyResponList(from, chata, db_respon_list)) {
        if (!isPricelist) {
            let buttlist = [{buttonId: `Payment`, buttonText: {displayText: 'Buy'}, type: 1}]
            var get_data_respon = getDataResponList(from, chata, db_respon_list)
            if (get_data_respon.isImage === false) {
            FiizuBot.sendMessage(from, { text: sendResponList(from, chata, db_respon_list), footer: footer, buttons: buttlist, mentions:[sender] })
        } else {
            FiizuBot.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response, footer: footer, buttons: buttlist, mentions:[sender] })
            }
        }   }
        
        if (!isCmd && isGroup && alreadyPayment(from, chata, fiibot_payment)) {
        if (!isPricelist) {
            var get_data_respon = getPayment(from, chata, fiibot_payment)
            if (get_data_respon.qrisCode === false) {
            FiizuBot.sendMessage(from, { text: sendPayment(from, chata, fiibot_payment) }, {quoted: msg} )
        } else {
            FiizuBot.sendMessage(from, { image: await getBuffer(get_data_respon.qCodeLink), caption: get_data_respon.fiibotPayment }, {quoted: msg} )
            }
        }   }

        const replyDeface = async (text) => {
            return sock.sendMessage(from, { text: text }, { quoted: msg })
        }
        const replyDefaceGc = async (text) => {
            return sock.sendMessage(from, { text: text }, { quoted: msg })
        }

        const reply = async (text) => {
            return sock.sendMessage(from, { text: text }, { quoted: msg })
        }
        const repky = async (text) => {
            return sock.sendMessage(from, { text: text })
        }

        const buttgroupmode = [ {index: 1, urlButton: {displayText: 'Get features', url: 'https://chat.whatsapp.com/F0BT0ZTB6s09HeaZSbyuzq'}},
                  {index: 2, quickReplyButton: {displayText: 'Home', id: '.home'}},]
        const replyGroupmode = async (text) => {
            return sock.sendMessage(from, { text: text, templateButtons: buttgroupmode }, { quoted: msg})
        }

        if ((budy) && ["Bot", "bot", "Bit", "bit", "Bpt", "bpt"].includes(budy) && !isCmd) {
        if (isGroup) {
            let getTextBot = getTextSetBot(from, set_bot)
            if (getTextBot) {
            var rows = [
                { title: '🛍️ • List', rowId: '.shp' },
                { title: '🪄 • Creator', rowId: '.crtr' },
                { title: '🏡 • Fiibot Homepage', rowId: '.home' }
            ]
            let buttbot = { text: getTextBot, buttonText: `Click Me !`, mentions: [sender], sections: [{title: '[ Fiizu Bot ]  Onlineshop Bot', rows: rows}]
            }
            FiizuBot.sendMessage(from, buttbot, { quoted: msg })
            } else {
            var rows = [
                { title: '🛍️ • List', rowId: '.shp' },
                { title: '🪄 • Creator', rowId: '.crtr' },
                { title: '🏡 • Fiibot Homepage', rowId: '.home' }
            ]
            let bttnbott = { text: ` ${mono}Can i help u ?${mono}`, buttonText: `Click Me !`, mentions: [sender], sections: [{title: '[ Fiizu Bot ]  Onlineshop Bot', rows: rows}]
            }
            FiizuBot.sendMessage(from, bttnbott, { quoted: msg })
        }
        }
            if (!isGroup) {
            var rows = [
                { title: '⚡ • Speed', rowId: '.spd' },
                { title: '🛒️ • Product', rowId: '.ctlg' },
                { title: '🪄 • Creator', rowId: '.crtr' },
                { title: '🎲 • Fiibot Group', rowId: '.mygc' },
                { title: '🏡 • Fiibot Homepage', rowId: '.home' }
            ]
            let bttnbottpc = { text: ` ${mono}Fiibot is online${mono}`, buttonText: `Click Me !`, mentions: [sender], sections: [{title: '[ Fiizu Bot ]  Onlineshop Bot', rows: rows}]
            }
            FiizuBot.sendMessage(from, bttnbottpc, { quoted: msg })
            }
        }

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
        	    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, async (err) => {
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
        
        //  break time  //
        setInterval(() => {
        for (let i of Object.values(opengc)) {
            if (Date.now() >= i.time) {
                FiizuBot.groupSettingUpdate(i.id, "not_announcement")
                .then((res) =>
                FiizuBot.sendMessage(i.id, { text: `*⌛〡Break time is over*` }))
                .then((res) =>
                FiizuBot.sendMessage(i.id, { text: `*✅〡Group opened*` }))
                .catch((err) =>
                FiizuBot.sendMessage(i.id, { text: mess.error.fail}))
                delete opengc[i.id]
                fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            }}
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

        _sewa.expiredCheck(FiizuBot, sewa)

        if (isCmd) { console.log(` \n[ ${time} ] ${body}\nSender ${pushname}\nFrom ${isGroup ? 'Group '+groupName : 'Private Chat'}\nID ${from}\n `) }
      
            let register = JSON.parse(fs.readFileSync('./database/fiibot_user.json'))
	        const isUser = register.includes(sender)
            
            var { download, upload } = await checkBandwidth();
            var txthome = allMenu(waktu, emojiWaktu, pushname, jam, tanggal, isFiizu, readhome)
            var myfiizumenu = fiizumenu(pushname, ownerNumber)
            var mytxtprofile = txtprofile(botName, ownerName, register, version, updateon, releasedon)

            function jsonformat(string) {
                return JSON.stringify(string, null, 2)
            }
        
            // fiibutton //
            const buttexpto = [{ urlButton: { displayText: `Lanjut Sewa`, url: `https://wa.me/${owncek}?text=Mau%20lanjutin%20sewa` } }]
            const buttproduct = [ {index: 1, urlButton: {displayText: 'View', url: 'https://wa.me/c/628979879840'}} ]
            const buttrbc = [ {index: 1, urlButton: {displayText: 'Creator', url: 'https://api.whatsapp.com/send?phone=+6283138644643'}},
                  {index: 2, quickReplyButton: {displayText: 'Home', id: '.home'}},
                  {index: 3, quickReplyButton: {displayText: 'List', id: '.l'}}, ]
            
            const isUrl = (url) => {
        	    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
            }
        
            const sendContact = (jid, numbers, name, quoted, mn) => {
        	    let number = numbers.replace(/[^0-9]/g, '')
        	    const vcard = 'BEGIN:VCARD\n' 
        	    + 'VERSION:3.0\n' 
        	    + 'FN:Fiizu\n'
        	    + 'ORG:Fiibot Project\n'
        	    + 'TEL;type=WhatsApp;type=VOICE;waid=' + number + ':+' + number + '\n'
        	    + 'END:VCARD'
        	    return FiizuBot.sendMessage(from, { contacts: { displayName: ownerName, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
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
            var usgaddfiipay = FiizuBotusgaddfiipay('.'+command)
            var usgdellist = FiizuBotusgdellist('.'+command)
            var usgrename = FiizuBotusgrename('.'+command)
            var usgupdlist = FiizuBotusgupdlist('.'+command)
            var usgpause = FiizuBotusgpause('.'+command)
            var usgcalculator = FiizuBotusgcalculator('.'+command)
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
            var usgidgame = FiizuBotusgidgame('.'+command)
            var usgidserver = FiizuBotusgidserver('.'+command)
            var usgbc = FiizuBotusgbc('.'+command)
            var usgaddjs = FiizuBotusgaddjs('.'+command)
            var usgjoin = FiizuBotusgjoin('.'+command)
            var usgsearchsticker = FiizuBotusgsearchsticker('.'+command)

        //  afk active  //
	    if (isGroup) {
		    for (let x of mentionUser) {
		        if (afkg.checkAfkUser(x, _afks)) {
			    const getId = afkg.getAfkId(x, _afks)
			    const getReason = afkg.getAfkReason(getId, _afks)
			    const getTime = afkg.getAfkTime(getId, _afks)
			    //  if (FiizuBot.message.extendedTextMessage != undefined){  //
	            try {
                var afpk = await FiizuBot.profilePictureUrl(mentionUser[0], 'image')
                } catch {
                var afpk = 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
            }
                var thumeb = await getBuffer(afpk)
                const aluty = `*•⊣| Admin Afk |⊢•*\n\n${pushname} is Offline\n∘ Reason  : ${getReason}\n∘ Afk time : ${getTime}`
                FiizuBot.sendMessage(from, { text: aluty, contextInfo:{ externalAdReply:{ title: `[ AFK ] Active`, body: pushname, thumbnail: afkImage, sourceUrl: `https://wa.me/${sender}`, mediaUrl: '', renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}});
                //  sendMess(x, `Assalamualaikum\n\n_Ada Yg Mencari Kamu Saat Kamu Offline/Afk_\n\nNama : ${pushname}\nNomor : wa.me/${sender.split("@")[0]}\nDi Group : ${groupName}\nPesan : ${chata}`)  //
                }
            }
            //  afk non active  //
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

	    if ((budy) && !isCmd) {
	        if (!isUser)
	        register.push(sender)
            fs.writeFileSync('./database/fiibot_user.json', JSON.stringify(register, null, 2))
        }

        if ((budy) && isCmd) {
            if (!isUser)
	        register.push(sender)
            fs.writeFileSync('./database/fiibot_user.json', JSON.stringify(register, null, 2))
        }
        
        if ((budy) && !isCmd) {
            if (!isGroup) return replyDefaceGc(`Sorry, Im just a Bot`)
            .then((res) => repky(`If you need anything please contact my creator`))
            .then((res) => sendContact(from, ownnumber.split('@s.whatsapp.net')[0], ownerName))
        }

        if (chata.startsWith("$$") && isDev) {
            console.log(color('[ EXEC ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
            exec(chata.slice(2), (err, stdout) => {
                if (err) return replyDeface(`${err}`)
                if (stdout) replyDeface(`${stdout}`)
            })
        }

        if (chata.startsWith(">>") && isDev) {
	        console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
            try {
            let evaled = await eval(chata.slice(2))
            if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
                replyDeface(`${evaled}`)
            } catch (err) {
            replyDeface(`${err}`)
            }
        }

                    //  group invite  //
                    if (m.mtype === 'groupInviteMessage') {
                        var eyeye = `*${botName} private mode*\n\nIf you want to add a bot, please contact my /owner`
                        FiizuBot.sendMessage(from, {text: eyeye, contextInfo:{externalAdReply:{
                        title: ownerName,
                        body: `${botName} · Onlineshop Bot`,
                        thumbnail: pichomepage,
                        mediaType:1,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        mediaUrl: 'https://telegra.ph/file/bd2ea5d3d74808da97f9d.jpg',
                        sourceUrl: 'https://wa.me/6283138644643'
                    }
                }
                    },
                        {quoted:m})
                        }

                        //  anti group chat  //
                        if (isGroup && isAntiLink && !isFiizu && !isGroupAdmins && isFiibotGroupAdmins) {
                        if (budy.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                        replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
                        FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
                    }
                }
                if (isGroup && isAntiLink && !isFiizu && !isGroupAdmins && isFiibotGroupAdmins) {
                if (budy.match('chat.whatsapp.com/')) {
                replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
                FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
                }
                }
                //  wame  //
                if (isGroup && isAntiWame && !isFiizu && !isGroupAdmins && isFiibotGroupAdmins) {
                if (chata.match(/(wa.me)/gi)) {
                replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
                FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
                }
                    }
                        if (isGroup && isAntiWame && !isFiizu && !isGroupAdmins && isFiibotGroupAdmins) {
                        if (budy.match(/(https:\/\/wa.me)/gi)) {
                        replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
                        FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
                    }
                }
                //  anti all link  //
                if (isGroup && isAntiLinkAll && !isFiizu && !isGroupAdmins && isFiibotGroupAdmins) {
                if (budy.match('https://')) {
                replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
                FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
                }
                    }
                        if (isGroup && isAntiLinkAll && !isFiizu && !isGroupAdmins && isFiibotGroupAdmins) {
                        if (budy.match('http://')) {
                        replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
                        FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
                    }
                    }
                        if (isGroup && isAntiLinkAll && !isFiizu && !isGroupAdmins && isFiibotGroupAdmins) {
                        if (budy.match('.me/')) {
                        replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
                        FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
                    }
                }
                if (isGroup && isAntiLinkAll && !isFiizu && !isGroupAdmins && isFiibotGroupAdmins) {
                if (budy.match('.com')) {
                replyDeface(`${mono}「 Sorry, Fiibot detect link 」${mono}`)
                FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
            }
        }
        
        // anti virtext //
        if (isGroup && isAntiVirtext && !isFiizu && isFiibotGroupAdmins) {
        if (budy.length > 4000) {
        repky(`   ️\n`.repeat(100))
        .then((res) => repky(`   \n`.repeat(100)))
        .then((res) => repky(`   \n`.repeat(100)))
        .then((res) => repky(`   \n`.repeat(100)))
        .then((res) => repky(`   \n`.repeat(100)))
        .then((res) => repky(`   \n`.repeat(100)))
        .then((res) => repky(`${mono}「 Sorry, Fiibot detect virus 」${mono}`))
        FiizuBot.groupParticipantsUpdate(from, [sender], "remove")
        } }

    function countdown(month, day, year) {
        let from = new Date(`${month} ${day}, ${year} 00:00:00`).getTime();
        let now = Date.now();
        let distance = from - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds." }

        if ((budy) && ["P", "Proses", "p", "proses", "Pending", "pending"].includes(budy) && !isCmd) {
            if (!isGroup) return
            if (!m.isQuotedMsg) return
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isFiizu && !isGroupAdmins) return
            let proses = `${mono}🌀 Status Proses\n⏰ ${jam}\n📆 ${tanggalid}${mono}\n📝 Pesanan :\n${rm.quoted.text}\n\n*Pesanan @${rm.quoted.sender.split("@")[0]} sedang dikirim oleh Admin ${pushname}*`
            const getTextP = getTextSetProses(from, set_proses);
            if (getTextP !== undefined) {
            mentions(getTextP.replace('#order', rm.quoted.text).replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('@buyer', `@${rm.quoted.sender.split("@")[0]}`).replace('#clock', jam).replace('#date', tanggal).replace('#iddate', tanggalid), [rm.quoted.sender], true);
            } else {
            mentions(proses, [rm.quoted.sender], true)
            }
        }

        if ((budy) && ["D", "Done", "d", "done"].includes(budy) && !isCmd) {
            if (!isGroup) return
            if (!m.isQuotedMsg) return
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isFiizu && !isGroupAdmins) return
            let sukses = `${mono}🌀 Status Sukses\n⏰ ${jam}\n📆 ${tanggalid}${mono}\n\n*Pesanan @${rm.quoted.sender.split("@")[0]} telah dikirim oleh Admin ${pushname}*`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
            mentions(getTextD.replace('#order', rm.quoted.text).replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('@buyer', `@${rm.quoted.sender.split("@")[0]}`).replace('#clock', jam).replace('#date', tanggal).replace('#iddate', tanggalid), [rm.quoted.sender], true);
            } else {
            mentions(sukses, [rm.quoted.sender], true)
            }
        }

switch (command) {
    case 'home': case 'botmenu':
        case 'help': case 'homepage': 
            let buttonns = [
            { buttonId: `.spd`, buttonText: {displayText: 'Speed'}, type: 1}, { buttonId: `.crtr`, buttonText: {displayText: 'Creator'}, type: 1}
            ]
            let buttonMessage = {
            document: fs.readFileSync("./temp/fbot.rtf"),
            mimetype: "application/rtf",
            fileName: emojiWaktu,
            fileLength: 100,
            caption: txthome,
            footer: `Version ${version}\nUpdate on ${updateon}\nReleased on ${releasedon}                              `,
            buttons: buttonns,
            headerType: 4,
            contextInfo:{externalAdReply:{
            title: `Fiibot`,
            body: "Onlineshop Bot",
            thumbnail: homelands,
            thumbnailUrl: urlhomelands,
            sourceUrl: `https://wa.me/p/5000807870021088/628979879840`,
            mediaUrl: '',
            renderLargerThumbnail: true,
            showAdAttribution: false,
            mediaType: 1
            }}
            }
            FiizuBot.sendMessage(from, buttonMessage)
    break

    case 'list': case 'menu':
        case 'shop': case 'shp': case 'l':
        if (isGroup) {
            if (isPricelist) return //reply(mess.GroupPricelist)
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
                text: `👋 Hello ${isFiizu ? 'Fiizu' : pushname.slice(0, 19)}\n🪀 ${groupName.slice(0, 27)}`,
                buttonText: `Click Me !`,
                footer: `\n${emojiWaktu} ${hari} ${waktu}\n📅 ${aMonth} ${mono}${aDay},${mono} ${mono}${aYear}〡${time}   ${mono}`,
                mentions: [sender],
                sections: [{
                    title: `⋮☰ Product from ${groupName}`, rows: arr_rows
                }]
            }
            FiizuBot.sendMessage(from, listMsg)
            // sendOrder(from, listMsg, "3836", thum, 2022, "MENU PRICELIST", `${owncek}@s.whatsapp.net`, "AR6ebQf7wTuyXrVneA0kUMMbQe67ikT6LZrwT2uge7wIEw==", "9783") //
            }
            if (!isGroup) {
                let buttishome = [
                { buttonId: `.home`, buttonText: {displayText: 'Homepage'}, type: 1} ]
                FiizuBot.sendMessage(from, { text: myres.list.listinpc, buttons: buttishome }, {quoted: msg})
            }
    break

    case 'ping': case 'speed':
        case 'spd': case 'run': case 'runtime':
                var starts = now();
                let ends = now();
                var start = now() - starts
                let end = now() - ends
                let resultPerformance = `*Performance*\n• Start ${start.toFixed(3)}\n• Start-end ${(start-end).toFixed(3)}`
                let resultRuntime = `*Running Time*\n• ${runtime(process.uptime())}`
                reply(resultPerformance)
                .then((res) => repky(resultRuntime))
    break

    case 'fiizucmd':
        case 'fiizuscommand': case 'fiizucommand':
            FiizuBot.sendMessage(from, { text: myfiizumenu, contextInfo:{ externalAdReply:{ title: `Fiibot️`, body: "Onlineshop Bot", thumbnail: homelands, sourceUrl: `https://wa.me/p/5000807870021088/628979879840`, mediaUrl: urlhomelands, renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}});
    break

    case 'profile': case 'profil': case 'info':
        case 'prfle': case 'botinfo': case 'infobot':
            FiizuBot.sendMessage(from, { text: mytxtprofile, contextInfo:{ externalAdReply:{ title: `Fiibot️`, body: "Onlineshop Bot", thumbnail: homelands, sourceUrl: `https://wa.me/p/5000807870021088/628979879840`, mediaUrl: urlhomelands, renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}});
    break

    case 'addlist':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!q.includes("@")) return replyDeface(usgaddlist)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`*❎〡Listkey ${args1} is available*`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./temp/cache/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(myres.list.succaddlist)
                        .then((res) => repky(`*💬〡Keyword*\n${args1}`))
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(myres.list.succaddlist)
                .then((res) => repky(`*💬〡Keyword*\n${args1}`))
            }
    break

    case 'addpay':
        case 'addpayment':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!q) return reply(usgaddfiipay)
            if (alreadyPayment(from, 'Payment', fiibot_payment)) return reply(myres.list.avlfiipay)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./temp/cache/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addPayment(from, 'Payment', q, true, `https://telegra.ph${json[0].src}`, fiibot_payment)
                        reply(myres.list.succaddfiipay)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addPayment(from, 'Payment', q, false, '-', fiibot_payment)
                reply(myres.list.succaddfiipay)
            }
    break

    case 'updatepayment': case 'updatepay':
        case 'updpay': case 'updpayment':
            case 'changepay': case 'changepayment':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!q) return reply(usgaddfiipay)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./temp/cache/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        updatePayment(from, 'Payment', q, true, `https://telegra.ph${json[0].src}`, fiibot_payment)
                        reply(myres.list.succupdfiipay)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                updatePayment(from, 'Payment', q, false, '-', fiibot_payment)
                reply(myres.list.succupdfiipay)
            }
    break

    case 'dellist':
        case 'deletelist':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (db_respon_list.length === 0) return reply(myres.list.nodellist)
            if (!q) return replyDeface(usgdellist)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(myres.list.nodellist)
            delResponList(from, q, db_respon_list)
            reply(myres.list.succdellist)
    break

    case 'dellist22':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (db_respon_list.length === 0) return reply(myres.list.nodellist)
            var uturu = q.split("@")[0]
            if (!q) return replyDeface(usgdellist)
            if (!isAlreadyResponList(from, uturu, db_respon_list)) return reply(myres.list.nodellist)
            delResponList(from, uturu, db_respon_list)
            reply(myres.list.succdellist)
    break

    case 'updkey': case 'updatekey':
        case 'changekey':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!q.includes("@")) return replyDeface(usgrename)
            if (!isAlreadyResponList(from, args1, db_respon_list)) return repky(myres.list.norename)
                renameKeyList(from, args1, args2, db_respon_list)
                reply(myres.list.succrename).then((res) => repky(`*🚮〡Old keywords*\n${args1}\n\n*🆕〡New keywords*\n${args2}`))
    break

    case 'updatelist': case 'update':
        case 'updlist': case 'upd':
            case 'changelist':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!q.includes("@")) return replyDeface(usgupdlist)
            if (!isAlreadyResponList(from, args1, db_respon_list)) return reply(myres.list.noupdlist)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./temp/cache/${sender}`)
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

    case 'h':
        case 'hidetag':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
		    if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            let mem = [];
            groupMembers.map( i => mem.push(i.id) )
            if (!m.isQuotedMsg) {
            FiizuBot.sendMessage(from, { text: q ? q : ' ', mentions: mem }, { quoted: m })
            } else if (m.isQuotedMsg) {
            FiizuBot.sendMessage(from, { text: rm.quoted.text, mentions: mem }, { quoted: m }) }
    break

    case 'p':
        case 'proses':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return
            if (!isFiizu && !isGroupAdmins) return
            let proses = `${mono}🌀 Status Proses\n⏰ ${jam}\n📆 ${tanggalid}${mono}\n\n📝 Pesanan :\n${rm.quoted.text}\n\n*Pesanan @${rm.quoted.sender.split("@")[0]} sedang dikirim oleh Admin ${pushname}*`
            const getTextP = getTextSetProses(from, set_proses);
            if (getTextP !== undefined) {
                mentions(getTextP.replace('#order', rm.quoted.text).replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('@buyer', `@${rm.quoted.sender.split("@")[0]}`).replace('#clock', jam).replace('#date', tanggal).replace('#iddate', tanggalid), [rm.quoted.sender], true);
            } else {
                mentions(proses, [rm.quoted.sender], true)
            }
    break

    case 'd':
        case 'done':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return
            if (!isFiizu && !isGroupAdmins) return
            let sukses = `${mono}🌀 Status Sukses\n⏰ ${jam}\n📆 ${tanggalid}${mono}\n\n*Pesanan @${rm.quoted.sender.split("@")[0]} telah dikirim oleh Admin ${pushname}*`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
                mentions(getTextD.replace('#order', rm.quoted.text).replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('@buyer', `@${rm.quoted.sender.split("@")[0]}`).replace('#clock', jam).replace('#date', tanggal).replace('#iddate', tanggalid), [rm.quoted.sender], true);
            } else {
                mentions(sukses, [rm.quoted.sender], true)
            }
    break

    case 'setproses':
        case 'setp':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetproses)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*@buyer*  : tag pembeli\n\n*#order*  : pesanan pembeli\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#iddate*  : ${tanggalid}`))
            if (isSetProses(from, set_proses)) return replyDeface(myres.order.avlsetproses)
            addSetProses(q, from, set_proses)
            replyDeface(myres.order.succsetproses)
    break

    case 'ml': case 'mlbb':
        case 'mobilelegend': case 'mobilelegends':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if ((!args[0]) && (!Number(args[0]))) return replyDeface(usgidserver)
            if (!args[0].includes('.')) return replyDeface(usgidserver)
            replyDeface(`*🆔〡Mobile legends ${q}*`)
            var myID = q.split(".")[0]
            var mySER = q.split(".")[1]
            hikki.game.nickNameMobileLegends(myID, mySER)
            .then( res => { repky(res.userName) })
            .catch( err => { reply(mess.error.fail) })
    break

    case 'ff':
        case 'freefire':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if (!args[0]) return replyDeface(usgidgame)
            if (!Number(args[0])) return reply(myres.notnumber)
            replyDeface(`*🆔〡Free fire ${q}*`)
            hikki.game.nickNameFreefire(q)
            .then( det => { repky(det.userName) })
         	.catch( err => { reply(mess.error.fail) })
    break

    case 'supersus':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if (!args[0]) return replyDeface(usgidgame)
            if (!Number(args[0])) return reply(myres.notnumber)
            replyDeface(`*🆔〡Supersus ${q}*`)
            hikki.game.superSusChecker(q)
            .then( det => { repky(det.userName) })
         	.catch( err => { reply(mess.error.fail) })
    break

    case 'pubg':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if (!args[0]) return replyDeface(usgidgame)
            replyDeface(`*🆔〡Pubg ${q}*`)
            axios.get(`https://api.lolhuman.xyz/api/pubg/${q}?apikey=${apikey}`)
            .then(({data}) => { repky(data.result) })
            .catch((err) => { reply(mess.error.fail) })
    break

    case 'higgs': case 'higg':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if (!args[0]) return replyDeface(usgidgame)
            replyDeface(`*🆔〡Higgs domino ${q}*`)
            axios.get(`https://api.lolhuman.xyz/api/higghdomino/${q}?apikey=${apikey}`)
            .then(({data}) => { repky(data.result) })
            .catch((err) => { reply(mess.error.fail) })
    break

    case 'codm':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if (!args[0]) return replyDeface(usgidgame)
            replyDeface(`*🆔〡Codm ${q}*`)
            axios.get(`https://api.lolhuman.xyz/api/codm/${q}?apikey=${apikey}`)
         	.then(({data}) => { repky(data.result) })
         	.catch((err) => { reply(mess.error.fail) })
    break

    case 'sausage':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if (!args[0]) return replyDeface(usgidgame)
            replyDeface(`*🆔〡Sausage ${q}*`)
            axios.get(`https://api.lolhuman.xyz/api/sausageman/${q}?apikey=${apikey}`)
         	.then(({data}) => { repky(data.result) })
         	.catch((err) => { reply(mess.error.fail) })
    break

    case 'listadmin':
        case 'admin':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            let owngc = groupMetadata.owner
            let teks = `*${groupMetadata.subject}*\nCreated by ${owngc ? '+' + owngc.split("@")[0] : "Unknown"}\n\nAdmins ${mono}${groupAdmins.length}${mono}`
            let no = 0
            for (let admon of groupAdmins) {
            no += 1
            teks += `\n[ ${mono}${no.toString()}${mono} ] @${admon.split('@')[0]}`
            }
            mentions(teks, groupAdmins, true)
    break

    case 'changeproses': case 'changep':
        case 'updateproses': case 'updproses':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetproses)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*@buyer*  : tag pembeli\n\n*#order*  : pesanan pembeli\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#iddate*  : ${tanggalid}`))
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
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!isSetProses(from, set_proses)) return reply(myres.order.nogetproses)
                replyDeface(`*Text Set Proses*\n\n${getTextSetProses(from, set_proses)}`)  
    break

    case 'resetproses':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isSetProses(from, set_proses)) return replyDeface(myres.order.noresetproses)
            removeSetProses(from, set_proses)
                replyDeface(myres.order.succresetproses)
    break

    case 'setdone':
        case 'setd':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetdone)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*@buyer*  : tag pembeli\n\n*#order*  : pesanan pembeli\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#iddate*  : ${tanggalid}`))
            if (isSetDone(from, set_done)) return replyDeface(myres.order.avlsetdone)
            addSetDone(q, from, set_done)
            replyDeface(myres.order.succsetdone)
    break

    case 'changedone': case 'changed':
        case 'updatedone': case 'upddone':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetdone)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*@buyer*  : tag pembeli\n\n*#order*  : pesanan pembeli\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#iddate*  : ${tanggalid}`))
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
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!isSetDone(from, set_done)) return reply(myres.order.nogetdone)
                replyDeface(`*Text Set Done*\n\n${getTextSetDone(from, set_done)}`)
    break

    case 'resetdone':
            if (isPricelist) return //reply(mess.GroupPricelist)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isSetDone(from, set_done)) return replyDeface(myres.order.noresetdone)
            removeSetDone(from, set_done)
            replyDeface(myres.order.succresetdone)
    break

    case 'bot':
        case 'bit': case 'bpt':
            if (isGroup) {
            let getTextBot = getTextSetBot(from, set_bot)
            if (getTextBot) {
            var rows = [
                { title: '🛍️ • List', rowId: '.shp' },
                { title: '🪄 • Creator', rowId: '.crtr' },
                { title: '🏡 • Fiibot Homepage', rowId: '.home' }
            ]
            let buttbot = { text: getTextBot, buttonText: `Click Me !`, mentions: [sender], sections: [{title: '[ Fiizu Bot ]  Onlineshop Bot', rows: rows}]
            }
            FiizuBot.sendMessage(from, buttbot, { quoted: msg })
            } else {
            var rows = [
                { title: '🛍️ • List', rowId: '.shp' },
                { title: '🪄 • Creator', rowId: '.crtr' },
                { title: '🏡 • Fiibot Homepage', rowId: '.home' }
            ]
            let bttnbott = { text: ` ${mono}Can i help u ?${mono}`, buttonText: `Click Me !`, mentions: [sender], sections: [{title: '[ Fiizu Bot ]  Onlineshop Bot', rows: rows}]
            }
            FiizuBot.sendMessage(from, bttnbott, { quoted: msg })
        }
        }
            if (!isGroup) {
            var rows = [
                { title: '⚡ • Speed', rowId: '.spd' },
                { title: '🛒️ • Product', rowId: '.ctlg' },
                { title: '🪄 • Creator', rowId: '.crtr' },
                { title: '🎲 • Fiibot Group', rowId: '.mygc' },
                { title: '🏡 • Fiibot Homepage', rowId: '.home' }
            ]
            let bttnbottpc = { text: ` ${mono}Fiibot is online${mono}`, buttonText: `Click Me !`, mentions: [sender], sections: [{title: '[ Fiizu Bot ]  Onlineshop Bot', rows: rows}]
            }
            FiizuBot.sendMessage(from, bttnbottpc, { quoted: msg })
            }
    break

    case 'setbot':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetbot)
            if (isSetBot(from, set_bot)) return replyDeface(myres.setbot.avlsetbot)
            addSetBot(q, from, set_bot)
            replyDeface(myres.setbot.succsetbot)
    break

    case 'changebot': case 'updatesetbot':
        case 'updsetbot': case 'changesetbot':
            case 'updbot': case 'updsetbot':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetbot)
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
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isSetBot(from, set_bot)) return replyDeface(myres.setbot.noresetbot)
            removeSetBot(from, set_bot)
            replyDeface(myres.setbot.succresetbot)
    break

    case 'add':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
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
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                FiizuBot.groupParticipantsUpdate(from, [number], "remove")
            } else if (rm.quoted) {
                if (m.quotedMsg.fromMe) return replyDeface('*❎〡Access denied*')
                number = m.quotedMsg.sender
                FiizuBot.groupParticipantsUpdate(from, [number], "remove")
            } else {
                replyDeface(usgkickjs)
            }
    break

    case 'addadmn':
        case 'addadmin': case 'addadm':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (mentionUser.length !== 0) {
                FiizuBot.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                .then( res => { mentions(`*Hey @${mentionUser[0].split("@")[0]}*\nYoure now admin`, [mentionUser[0]], true) })
            } else if (m.isQuotedMsg) {
                FiizuBot.groupParticipantsUpdate(from, [m.quotedMsg.sender], "promote")
                .then( res => { mentions(`*Hey @${m.quotedMsg.sender.split("@")[0]}*\nYoure now admin`, [m.quotedMsg.sender], true) })
            } else {
                replyDeface(usgaddadmnjs)
            }
    break

    case 'deladmn':
        case 'deladmin': case 'deladm':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (mentionUser.length !== 0) {
                FiizuBot.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                .then( res => { mentions(`*Hey @${mentionUser[0].split("@")[0]}*\nYoure now a member`, [mentionUser[0]], true) })
                .catch(() => replyDeface(mess.error.fail))
            } else if (m.isQuotedMsg) {
                FiizuBot.groupParticipantsUpdate(from, [m.quotedMsg.sender], "demote")
                .then( res => { mentions(`*Hey @${m.quotedMsg.sender.split("@")[0]}*\nYoure now a member`, [m.quotedMsg.sender], true) })
                .catch(() => replyDeface(mess.error.fail))
            } else {
                replyDeface(usgdeladmnjs)
            }
    break
        
    case 'owner': case 'creator':
        case 'own': case 'crtr': case 'dev':
            case 'developer':
            sendContact(from, ownnumber.split('@s.whatsapp.net')[0], ownerName)
    break

    case 'groupicon':
        case 'gcicon': case 'grupicon':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
		    if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
		    if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (isImage || isQuotedImage) {
            var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
            if (args[0] == '-long') {
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
                }).catch(() => replyDeface(mess.error.fail))
            }
            } else {
			    replyDeface(usgpicgc)
            }
    break

    case 'groupname':
        case 'gcname': case 'grupname':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
		    if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
		    if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (args.length < 1) return replyDeface(usgdessubgc)
            await FiizuBot.groupUpdateSubject(from, q)
            .then( res => {
                replyDeface(myres.setgc.succsubgc)
            }).catch(() => replyDeface(mess.error.fail))
    break

    case 'groupdesc': case 'gcdes':
        case 'groupdes': case 'grupdes': case 'grupdesc':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
		    if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
		    if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (args.length < 1) return replyDeface(usgdessubgc)
            await FiizuBot.groupUpdateDescription(from, q)
            .then( res => {
                replyDeface(myres.setgc.succdesgc)
            }).catch(() => replyDeface(mess.error.fail))
    break

    case 'chang‎elink':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            await FiizuBot.groupRevokeInvite(from)
            .then( res => {
                replyDeface(myres.setgc.succchangelink)
            }).catch(() => replyDeface(mess.error.fail))
    break
        
    case 'changelink':
        case 'changelinkgc':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
            let txsetl =`${mono}Are you sure to change the group link?${mono}`
            var bttnsetl = [{buttonId: `Cancel`, buttonText: { displayText: "Cancel" }, type: 1 },
            {buttonId: `.chang‎elink`, buttonText: { displayText: "Yes" }, type: 1 }]
            FiizuBot.sendMessage(from, { text: txsetl, buttons: bttnsetl, mentions: [sender] })
    break

    case 'del': case 'del': case 'delete':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!m.isQuotedMsg) return replyDeface(myres.deletechat.noreplydelete)
            if (!m.quotedMsg.fromMe) return replyDeface(myres.deletechat.replyme)
            FiizuBot.sendMessage(from, { delete: { fromMe: true, id: m.quotedMsg.id, remoteJid: from }})
    break
    
    case 'kalkulator': case 'calculator':
        case 'cal': case 'kal': case 'hasil':
            if (!args[0]) return replyDeface(usgcalculator)
            .then((res) => repky(mono+myres.resusgcalculator+mono))
            var calcresult = Math_js.evaluate(q)
            replyDeface(mono+calcresult+mono)
    break

    case 'afk':
        case 'offline': case 'off':
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
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
            const aluty = `*•⊣| Admin Afk |⊢•*\n\n${pushname} is Offline\n∘ Reason ${reason}\n∘ Afk at ${jam}`
            //FiizuBot.sendMessage(from, aluty, text)
            FiizuBot.sendMessage(from, { text: aluty, contextInfo:{ externalAdReply:{ title: `[ AFK ] Active`, body: pushname, thumbnail: afkImage, sourceUrl: `https://wa.me/${sender}`, mediaUrl: afkImage, renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}})
    break

    case 'break':
        case 'jeda': {
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (!args[0]) return replyDeface(usgpause).then((res) => repky(myres.resusgpause))
            opengc[from] = { id: from, time: Date.now() + toMS(args[0]) }
            fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            FiizuBot.groupSettingUpdate(from, "announcement")
            .then((res) => replyDeface(`*Group is taking a break*\nBreak time ${args[0]}`))
            .catch((err) => replyDeface(mess.error.fail))
            }
    break
        
        case 'welcome.on':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (isWelcome) return reply(myres.welcome.avlwelcome)
					welcome.push(from)
					fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
					reply(myres.welcome.succwelcome)
        break

        case 'welcome.off':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (!isWelcome) return reply(myres.welcome.avloffwelcome)
					let welcome1 = antiwame.indexOf(from)
					welcome.splice(welcome1, 1)
					fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
					reply(myres.welcome.succoffwelcome)
		break

        case 'leave.on':
            case 'left.on':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (isLeft) return reply(myres.leave.avlleave)
					left.push(from)
					fs.writeFileSync('./database/left.json', JSON.stringify(left, null, 2))
					reply(myres.leave.succleave)
		break
					
		case 'leave.off':
		    case 'left.off':
		            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (!isLeft) return reply(myres.leave.avloffleave)
					let leave1 = antiwame.indexOf(from)
					left.splice(leave1, 1)
					fs.writeFileSync('./database/left.json', JSON.stringify(left, null, 2))
					reply(myres.leave.succoffleave)
		break

        case 'welcome':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
                    if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
                    let txwelc =`*Welcome Message*`
                    var bttnwelc = [{buttonId: ".welcome.off", buttonText: { displayText: "Turn off" }, type: 1 },
                    {buttonId: ".welcome.on", buttonText: { displayText: "Turn on" }, type: 1 }]
                    FiizuBot.sendMessage(from, { text: txwelc, footer: `${isWelcome  ? 'Active':'Unactive'}`, buttons: bttnwelc, mentions: [sender] })
        break
        
        case 'leave':
            case 'left':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
                    if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
                    let txleft =`*Leave Message*`
                    var bttnleft = [{buttonId: ".leave.off", buttonText: { displayText: "Turn off" }, type: 1 },
                    {buttonId: ".leave.on", buttonText: { displayText: "Turn on" }, type: 1 }]
                    FiizuBot.sendMessage(from, { text: txleft, footer: `${isLeft ? 'Active':'Unactive'}`, buttons: bttnleft, mentions: [sender] })
        break

    case 'open':
        case 'buka':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
		    if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
		    if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            FiizuBot.groupSettingUpdate(from, 'not_announcement')
            .then((res) => {
            let opengc = `${mono}🎊 Grup Buka
📆 ${tanggalid}
⏰ ${jam}${mono}

*${groupName}*
*Telah Di Buka Kembali Oleh Admin ${pushname}*`
            const tettOpen = getTextSetOpen(from, set_open);
            if (tettOpen !== undefined) {
            mentions(tettOpen.replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('#time', `${emojiWaktu} ${waktu}`).replace('#time2', `${waktu} ${emojiWaktu}`).replace('#group', groupName).replace('#clock', jam).replace('#date', tanggal).replace('#iddate', tanggalid), [sender], true);
            } else {
            mentions(opengc, [sender], true)
            }
            })
    break

    case 'close':
        case 'tutup':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
		    if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
		    if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
		    FiizuBot.groupSettingUpdate(from, 'announcement')
		    .then((res) => {
			let closegc = `${mono}🎊 Grup Tutup
📆 ${tanggalid}
⏰ ${jam}${mono}

*${groupName}*
*Sedang Di Tutup Sementara Oleh Admin ${pushname}*`
            const textClose = getTextSetClose(from, set_close);
            if (textClose !== undefined) {
            mentions(textClose.replace('#admin', pushname).replace('@admin', `@${sender.split("@")[0]}`).replace('#time', `${emojiWaktu} ${waktu}`).replace('#time2', `${waktu} ${emojiWaktu}`).replace('#group', groupName).replace('#clock', jam).replace('#date', tanggal).replace('#iddate', tanggalid), [sender], true);
            } else {
            mentions(closegc, [sender], true)
            }
            })
    break

    case 'setopen':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (!args[0]) return replyDeface(usgsetopen)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*#time*  : ${emojiWaktu} ${waktu}\n\n*#time2*  : ${waktu} ${emojiWaktu}\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#iddate*  : ${tanggalid}`))
            if (isSetOpen(from, set_open)) return replyDeface(myres.open.avlsetopen)
            addSetOpen(q, from, set_open)
            replyDeface(myres.open.succsetopen)
    break

    case 'updateopen':
        case 'changeopen': case 'updopen':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
           if (!args[0]) return replyDeface(usgsetopen)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*#time*  : ${emojiWaktu} ${waktu}\n\n*#time2*  : ${waktu} ${emojiWaktu}\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#iddate*  : ${tanggalid}`))
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
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
            if (!isSetOpen(from, set_open)) return reply(myres.open.nogetopen)
            replyDeface(`*Text Set Open*\n\n${getTextSetOpen(from, set_open)}`)
    break

    case 'resetopen':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (!isSetOpen(from, set_open)) return replyDeface(myres.open.nosetopen)
            removeSetOpen(from, set_open)
            replyDeface(myres.open.succresetopen)
            break

    case 'setclose':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (!args[0]) return replyDeface(usgsetclose)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*#time*  : ${emojiWaktu} ${waktu}\n\n*#time2*  : ${waktu} ${emojiWaktu}\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#iddate*  : ${tanggalid}`))
            if (isSetClose(from, set_close)) return replyDeface(myres.close.avlsetclose)
            addSetClose(q, from, set_close)
            replyDeface(myres.close.succsetclose)
    break

    case 'updateclose':
        case 'changeclose': case 'updclose':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (!args[0]) return replyDeface(usgsetclose)
            .then((res) => repky(`*#admin*  : nama admin\n\n*@admin*  :  tag nama admin\n\n*#time*  : ${emojiWaktu} ${waktu}\n\n*#time2*  : ${waktu} ${emojiWaktu}\n\n*#clock*  : ${jam}\n\n*#date*  : ${tanggal}\n\n*#iddate*  : ${tanggalid}`))
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
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
            if (!isSetClose(from, set_close)) return reply(myres.close.nogetclose)
            replyDeface(`*Text Set Close*\n\n${getTextSetClose(from, set_close)}`)
    break

    case 'resetclose':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            if (!isSetClose(from, set_close)) return replyDeface(myres.close.nosetclose)
            removeSetClose(from, set_close)
            replyDeface(myres.close.succresetclose)
    break

    case 'setwelcome':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetwelcome)
            .then((res) => repky(`*@name*  : tag partisipan\n\n*#member*  : jumlah anggota\n\n*#group*  : nama grup\n\n*#des*  : deskripsi\n\n*#iddate*  : ${tanggalid}\n\n*#date*  : ${tanggal}\n\n*#clock*  : ${jam}\n\n*#time*  : ${waktu} ${emojiWaktu}\n\n*#idtime*  : ${waktuid} ${emojiWaktuid}`))
            if (isSetWelcome(from, set_welcome_db)) return replyDeface(myres.welcome.avlsetwelcome)
            addSetWelcome(q, from, set_welcome_db)
            replyDeface(myres.welcome.succsetwelcome)
    break

    case 'changewelcome':
        case 'updatewelcome': case 'updwelcome':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetwelcome)
            .then((res) => repky(`*@name*  : tag partisipan\n\n*#member*  : jumlah anggota\n\n*#group*  : nama grup\n\n*#des*  : deskripsi\n\n*#iddate*  : ${tanggalid}\n\n*#date*  : ${tanggal}\n\n*#clock*  : ${jam}\n\n*#time*  : ${waktu} ${emojiWaktu}\n\n*#idtime*  : ${waktuid} ${emojiWaktuid}`))
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
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!isSetWelcome(from, set_welcome_db)) return reply(myres.welcome.nogetwelcome)
                replyDeface(`*Text Set Welcome*\n\n${getTextSetWelcome(from, set_welcome_db)}`)
    break

    case 'resetwelcome':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isSetWelcome(from, set_welcome_db)) return replyDeface(myres.welcome.nosetwelcome)
            removeSetWelcome(from, set_welcome_db)
            replyDeface(myres.welcome.succresetwelcome)
    break

    case 'setleave':
        case 'setleft':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetleave)
            .then((res) => repky(`*@name*  : tag partisipan\n\n*#member*  : jumlah anggota\n\n*#group*  : nama grup\n\n*#des*  : deskripsi\n\n*#iddate*  : ${tanggalid}\n\n*#date*  : ${tanggal}\n\n*#clock*  : ${jam}\n\n*#time*  : ${waktu} ${emojiWaktu}\n\n*#idtime*  : ${waktuid} ${emojiWaktuid}`))
            if (isSetLeft(from, set_left_db)) return replyDeface(myres.leave.avlsetleave)
            addSetLeft(q, from, set_left_db)
            replyDeface(myres.leave.succsetleave)
    break

    case 'changeleave': case 'updateleave': case 'updleave':
        case 'changeleft': case 'updateleft': case 'updleft':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!args[0]) return replyDeface(usgsetleave)
            .then((res) => repky(`*@name*  : tag partisipan\n\n*#member*  : jumlah anggota\n\n*#group*  : nama grup\n\n*#des*  : deskripsi\n\n*#iddate*  : ${tanggalid}\n\n*#date*  : ${tanggal}\n\n*#clock*  : ${jam}\n\n*#time*  : ${waktu} ${emojiWaktu}\n\n*#idtime*  : ${waktuid} ${emojiWaktuid}`))
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
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return reply(mess.GroupAdmin)
            if (!isSetLeft(from, set_left_db)) return reply(myres.leave.nogetleave)
                replyDeface(`*Text Set Leave*\n\n${getTextSetWelcome(from, set_welcome_db)}`)
    break

    case 'resetleft': case 'resetleave':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isGroupAdmins && !isFiizu) return replyDeface(mess.GroupAdmin)
            if (!isSetLeft(from, set_left_db)) return replyDeface(myres.leave.nosetleave)
            removeSetLeft(from, set_left_db)
            replyDeface(myres.leave.succresetleave)
    break

    case 'linkgrup':
        case 'grouplink': case 'linkgc':
            case 'gclink': case 'linkgroup':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isFiibotGroupAdmins) return replyDeface(mess.FiibotAdmin)
            var url = await FiizuBot.groupInviteCode(from).catch(() => replyDeface(mess.error.fail))
            url = 'https://chat.whatsapp.com/'+url
            replyDeface(url)
    break

        case 'antilink.on':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
					if (isAntiLink) return reply(myres.antilink.avlantilink)
					antilink.push(from)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
					replyDeface(myres.antilink.succantilink)
		break

        case 'antilink.off':
					if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
					if (!isAntiLink) return reply(myres.antilink.avloffantilink)
					let antilink1 = antilink.indexOf(from)
					antilink.splice(antilink1, 1)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
					replyDeface(myres.antilink.succoffantilink)
		break

        case 'antilink':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
				    if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
                    if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
                    let txantilink =`*Anti group link*`
                    var bttnantilink = [{buttonId: ".antilink.off", buttonText: { displayText: "Turn off" }, type: 1 },
                    {buttonId: ".antilink.on", buttonText: { displayText: "Turn on" }, type: 1 }]
                    FiizuBot.sendMessage(from, { text: txantilink, footer: `${isAntiLink ? 'Active':'Unactive'}`, buttons: bttnantilink, mentions: [sender] })
        break

        case 'antialllink.on':
            case 'antilinkall.on':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
				    if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
                    if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
					if (isAntiLinkAll) return reply(myres.antilink.avlantilinkall)
					antilinkall.push(from)
					fs.writeFileSync('./database/antilinkall.json', JSON.stringify(antilinkall))
					replyDeface(myres.antilink.succantilinkall)
		break

        case 'antialllink.off':
            case 'antilinkall.off':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
				    if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
                    if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
					if (!isAntiLinkAll) return reply(myres.antilink.avloffantilinkall)
					let antiall1 = antilinkall.indexOf(from)
					antilinkall.splice(antiall1, 1)
					fs.writeFileSync('./database/antilinkall.json', JSON.stringify(antilinkall))
					replyDeface(myres.antilink.succoffantilinkall)
        break

        case 'antialllink':
            case 'antilinkall': case 'antiallink':
                if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
				if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
                if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
                let txantilinkall =`*Anti all links*`
                var bttnantilinkall = [{buttonId: ".antialllink.off", buttonText: { displayText: "Turn off" }, type: 1 },
                {buttonId: ".antialllink.on", buttonText: { displayText: "Turn on" }, type: 1 }]
                FiizuBot.sendMessage(from, { text: txantilinkall, footer: `${isAntiLinkAll ? 'Active':'Unactive'}`, buttons: bttnantilinkall, mentions: [sender] })
        break
				
        case 'antiwame.on':
                if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
				if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
                if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
				if (isAntiWame) return reply(myres.antilink.avlantiwame)
				antiwame.push(from)
				fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
					replyDeface(myres.antilink.succantiwame)
        break

        case 'antiwame.off':
				if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
				if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
                if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
				if (!isAntiWame) return reply(myres.antilink.avloffantiwame)
				let antiwame1 = antiwame.indexOf(from)
				antiwame.splice(antiwame1, 1)
				fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
				    replyDeface(myres.antilink.succoffantiwame)
    break

    case 'antiwame':
                if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
				if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
                if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
                let txantiwame =`*Anti wa.me*`
                var bttnantiwame = [{buttonId: ".antiwame.off", buttonText: { displayText: "Turn off" }, type: 1 },
                {buttonId: ".antiwame.on", buttonText: { displayText: "Turn on" }, type: 1 }]
                FiizuBot.sendMessage(from, { text: txantiwame, footer: `${isAntiWame ? 'Active':'Unactive'}`, buttons: bttnantiwame, mentions: [sender] })
    break

    case 'antivirtext.on':
        case 'antivirus.on':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
					if (isAntiVirtext) return reply(myres.antilink.avlantivirtext)
					antivirtext.push(from)
					fs.writeFileSync('./database/antivirtext.json', JSON.stringify(antivirtext))
					replyDeface(myres.antilink.succantivirtext)
		break

        case 'antivirtext.off':
            case 'antivirus.off':
					if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
					if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
					if (!isAntiVirtext) return reply(myres.antilink.avloffantivirtext)
					let antivirtext1 = antivirtext.indexOf(from)
					antivirtext.splice(antivirtext1, 1)
					fs.writeFileSync('./database/antivirtext.json', JSON.stringify(antivirtext))
					replyDeface(myres.antilink.succoffantivirtext)
		break

        case 'antivirtext': case 'antivirus':
            case 'antivirtek': case 'antivirteks':
                case 'antivirustext': case 'antivirusteks':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
				    if (!isFiizu && !isGroupAdmins) return reply(mess.GroupAdmin)
                    if (!isFiibotGroupAdmins) return reply(mess.FiibotAdmin)
                    let txantivirtext =`*Anti virus text*`
                    var bttnantivirtext = [{buttonId: ".antivirtext.off", buttonText: { displayText: "Turn off" }, type: 1 },
                    {buttonId: ".antivirtext.on", buttonText: { displayText: "Turn on" }, type: 1 }]
                    FiizuBot.sendMessage(from, { text: txantivirtext, footer: `${isAntiVirtext ? 'Active':'Unactive'}`, buttons: bttnantivirtext, mentions: [sender] })
        break

    case 'mygc': case 'grupbot':
        case 'mygrup': case 'mygroup': case 'gcbot':
            FiizuBot.sendMessage(from, { text: '*Fiibot Group Chat*', contextInfo:{ externalAdReply:{ title: "Fiibot️", body: "Come join my group", thumbnail: homelands, sourceUrl: `https://chat.whatsapp.com/F0BT0ZTB6s09HeaZSbyuzq`, mediaUrl: urlhomelands, renderLargerThumbnail: true, showAdAttribution: false, mediaType: 1 }}});
    break

    case 'ctlg': case 'sewa': case 'sewabot':
        case 'produk': case 'product': case 'rent': case 'rentbot':
        case 'rentalbot': case 'rental': case 'nyewa':
        FiizuBot.sendMessage(from, {text: `*Sewa Fiibot*`, footer: `IDR 8,000.00`, templateButtons: buttproduct})
    break

    case '5star':
        replyDeface(`Thanks for rating Fiibot`)
        .then((res) => FiizuBot.sendMessage(`120363046095213758@g.us`, { text: `${pushname.slice(0, 18)} just gave five stars🤩` }))
        FiibotRatings('5⃣ 🌟', sender, _ratings)
        FiibotRatingsFive('5⃣ 🌟', sender, five_stars)
    break

    case '4star':
        replyDeface(`Thanks for rating Fiibot`)
        .then((res) => FiizuBot.sendMessage(`120363046095213758@g.us`, { text: `${pushname.slice(0, 18)} just gave four stars😁` }) )
        FiibotRatings('4⃣ 🌟', sender, _ratings)
        FiibotRatingsFour('4⃣ 🌟', sender, four_stars)
    break

    case '3star':
        replyDeface(`Thanks for rating Fiibot`)
        .then((res) => FiizuBot.sendMessage(`120363046095213758@g.us`, { text: `${pushname.slice(0, 18)} just gave three stars🙂` }) )
        FiibotRatings('3⃣ ⭐', sender, _ratings)
        FiibotRatingsThree('3⃣ ⭐', sender, three_stars)
    break

    case '2star':
        replyDeface(`Thanks for rating Fiibot`)
        .then((res) => FiizuBot.sendMessage(`120363046095213758@g.us`, { text: `${pushname.slice(0, 18)} just gave two stars😕` }) )
        FiibotRatings('2⃣ ⭐', sender, _ratings)
        FiibotRatingsTwo('2⃣ ⭐', sender, two_stars)
    break

    case '1star':
        replyDeface(`Thanks for rating Fiibot`)
        .then((res) => FiizuBot.sendMessage(`120363046095213758@g.us`, { text: `${pushname.slice(0, 18)} just gave one star😓` }) )
        FiibotRatings('1⃣ ⭐', sender, _ratings)
        FiibotRatingsOne('1⃣ ⭐', sender, one_star)
    break

    case 's':
        case 'sticker': case 'stiker':
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if (isImage || isQuotedImage) {
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    FiizuBot.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				    
					fs.unlinkSync(`./${rand1}`)
			        fs.unlinkSync(`./${rand2}`)
			        })
				})
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=60, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
			     reply(mess.wait)
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				 .on("error", console.error)
				 .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      FiizuBot.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				      
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=60, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			    replyDeface(myres.convert.converttosticker)
            }
    break

    case 'toimg': case 'toimage': case 'image': case 'img':
        case 'tovid': case 'tovideo': case 'video': case 'vid':
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if (!isQuotedSticker) return replyDeface(myres.convert.converttoimg)
            var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
            var buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            var rand1 = 'temp/cache/'+getRandom('.webp')
            var rand2 = 'temp/cache/'+getRandom('.png')
            fs.writeFileSync(`./${rand1}`, buffer)
            if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                replyDeface(mess.wait)
                exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                    fs.unlinkSync(`./${rand1}`)
                    if (err) return replyDeface(mess.error.fail)
                    FiizuBot.sendMessage(from, { caption: `*Sticker to image*`, image: fs.readFileSync(`./${rand2}`) })
                    fs.unlinkSync(`./${rand2}`)
                })
            } else {
                replyDeface(mess.wait)
                webp2mp4File(`./${rand1}`).then(async(data) => {
                    fs.unlinkSync(`./${rand1}`)
                    FiizuBot.sendMessage(from, { caption: `*Sticker to video*`, video: await getBuffer(data.data) })
                })
            }
    break

    case 'tourl':
        case 'url':
            if (!isGroup) return replyGroupmode(mess.GroupMode)
                if (!isImage && !isQuotedImage) return replyDeface(myres.convert.converttourl)
                    if (isImage || isQuotedImage) {
                    replyDeface(mess.wait)
                    let media = await downloadAndSaveMediaMessage('image', `./temp/cache/${sender}`)
                    const fd = new FormData();
                    fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                    fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                    }).then(res => res.json())
                    .then((json) => {
                    repky(`*https://telegra.ph${json[0].src}*`)
                    if (fs.existsSync(media)) fs.unlinkSync(media)
                })
            }
    break

    case 'tomp3':
        case 'toaudio':
            if (!isGroup) return replyGroupmode(mess.GroupMode)
            if (isVideo || isQuotedVideo) {
                replyDeface(mess.wait)
                let media = await downloadAndSaveMediaMessage('video', './temp/cache/'+getRandom('.mp4'))
                let ran = './temp/cache/'+getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
                    fs.unlinkSync(media)
                    if (err) return replyDeface(mess.error.fail)
                    FiizuBot.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `Fiizu ${sender}ToMp3` })
                    fs.unlinkSync(media)
                    fs.unlinkSync(ran)
                })
            } else {
                replyDeface(myres.convert.converttoaudio)
            }
    break

    case 'rate':
        case 'rating':
        var pAll = 0
        for (let pall of _ratings) {
            pAll = pAll + pall.total_rating }
        // amount 1
        var pOne = 0
        for (let pone of one_star) {
            pOne = pOne + pone.total_rating }
        // amount 2
        var pTwo = 0
        for (let ptwo of two_stars) {
            pTwo = pTwo + ptwo.total_rating }
        // amount 3
        var pThree = 0
        for (let pthree of three_stars) {
            pThree = pThree + pthree.total_rating }
        // amount 4
        var pFour = 0
        for (let pfour of four_stars) {
            pFour = pFour + pfour.total_rating }
        // amount 5
        var pFive = 0
        for (let pfive of five_stars) {
            pFive = pFive + pfive.total_rating }
        
        let result = `*Fiibot Rating*`
        for (let rating of _ratings) {
            result += `\n\n${rating.fiibot_stars} ${mono}×${mono} ${mono}${rating.total_rating}${mono}`
        }

    var Rresult = Math_js.evaluate(((5*pFive)+(4*pFour)+(3*pThree)+(2*pTwo)+(1*pOne))/pAll)
    let _rters = JSON.parse(fs.readFileSync('./database/fiibot_rater.json'));
    var starRows =
        [{ title: '5⃣  •  🌟🌟🌟🌟🌟', rowId: '.5star' },
        { title: '4⃣  •  🌟🌟🌟🌟', rowId: '.4star' },
        { title: '3⃣  •  ⭐⭐⭐', rowId: '.3star' },
        { title: '2⃣  •  ⭐⭐', rowId: '.2star' },
        { title: '1⃣  •  ⭐', rowId: '.1star' }]
        let buttrating = { text: result, buttonText: `Rate Now !`, mentions: [sender], sections: [{title: `Rating : ${Rresult.toFixed(1)}〡ጸ ${_rters.length}`, rows: starRows}] }
        FiizuBot.sendMessage(from, buttrating, { quoted: msg })
    break

    case 'getlink':
        case 'glink':
            if (!isFiizu) return reply(mess.ForFiizu)
            if(!q)return reply(myres.txtgetlink)
            var linkgc = await FiizuBot.groupInviteCode(`${q}`)
            replyDeface('https://chat.whatsapp.com/'+linkgc)
    break

    case 'addrent':
        case 'addr':
            if (!isFiizu) return 
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
              if (!isFiizu) return reply(mess.ForFiizu)
              if (!q) return replyDeface(usgaddtime)
              if (!isSewa) return replyDeface(myres.rental.norent)
              if (!isUrl(args[0])) return replyDeface(mess.error.Iv)
              var url = args[0]
              url = url.split('https://chat.whatsapp.com/')[1]
              if (!args[1]) return replyDeface(myres.rental.notimerent)
              sewa.splice(_sewa.getSewaPosition(from, sewa), 1)
              fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
              replyDeface(myres.rental.loadingrtime)
              var data = await FiizuBot.groupAcceptInvite(url)
              if (_sewa.checkSewaGroup(data, sewa)) return replyDeface(myres.rental.isrented)
              _sewa.addSewaGroup(data, args[1], sewa)
              repky(myres.rental.succaddtime)
    break

    case 'stoprent':
        case 'stopr':
              if (!isFiizu) return replyDeface(mess.ForFiizu)
              if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
              if (!isSewa) return replyDeface(myres.rental.norent)
              sewa.splice(_sewa.getSewaPosition(from, sewa), 1)
              fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
              replyDeface(myres.rental.succstoprent)
    break

    case 'stoprentlink':
        case 'stoprlink':
            if (!isFiizu) return replyDeface(mess.ForFiizu)
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isSewa) return replyDeface(myres.rental.norent)
            if (!isUrl(args[0])) return replyDeface(mess.error.Iv)
            sewa.splice(_sewa.getSewaPosition(args[0], sewa), 1)
            fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
            replyDeface(myres.rental.succstoprent)
    break

    case 'cekrent':
        case 'checksewa': case 'rentcheck': case 'rentcek':
            case 'ceksewa': case 'cekrent': case 'rentcheck':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isSewa) return replyDeface(myres.rental.norent)
            let rentcheck = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
            let sewanya = `*⏳〡Remaining time*\n${rentcheck.days} days, ${rentcheck.hours} hours, ${rentcheck.minutes} minutes, ${rentcheck.seconds} seconds`
            replyDeface(sewanya)
            FiizuBot.sendMessage(`120363027932602232@g.us`, { text: sewanya })
    break

    case 'listsewa':
        case 'rentlist': case 'rlist':
            if (!isFiizu) return replyDeface(mess.ForFiizu)
            replyDeface(myres.succsentgcprivate)
            let txt = `*List of Rentals*\n*Total* ${sewa.length}`
            let data_array = [];
            for (let i of sewa) {
            let data_renter = await FiizuBot.groupMetadata(i.id)
            var renter = data_renter.owner
                data_array.push(i.id)
                    txt += `\n\n*[ • ] ${await getGcName(i.id)}*\n_${i.id}_\n`
            if (i.expired === 'PERMANENT') {
            let rentcheck = 'PERMANENT'
                    txt += `Lifetime`
            } else {
            let rentcheck = ms(i.expired - Date.now())
                    txt += `_${rentcheck.days} days, ${rentcheck.hours} hours, ${rentcheck.minutes} minutes, ${rentcheck.seconds} seconds_\nwa.me/${renter ? renter.split("@")[0] : "Unknown"}`
                }
            }
            FiizuBot.sendMessage(`120363027932602232@g.us`, { text: txt })
    break

    case 'rbc':
        case 'rentalbroadcast': case 'rentbc':
            if (!isFiizu) return reply(mess.ForFiizu)
            if (args.length < 1) return replyDeface(usgbc)
            for (let i of sewa) {
            FiizuBot.sendMessage(i.id, { text: q, footer: '~Fiizu', templateButtons: buttrbc })
            }
            replyDeface(`*✅〡Successfully sent to ${sewa.length} rental groups*`)
    break
        
        // shop mode kebalik //
        // on jadi off & off jadi on //
        case 'shopmode.off':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu) return reply(mess.ForFiizu)
					if (isPricelist) return reply(`*❎〡Shop mode is off*`)
					pricelist.push(from)
					fs.writeFileSync('./database/pricelist.json', JSON.stringify(pricelist, null, 2))
					replyDeface('*✅〡Successfully disabled shop feature*')
        break

        case 'shopmode.on':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
					if (!isFiizu) return reply(mess.ForFiizu)
					if (!isPricelist) return reply(`*❎〡Shop mode is on*`)
					let shopmode1 = pricelist.indexOf(from)
					pricelist.splice(shopmode1, 1)
					fs.writeFileSync('./database/pricelist.json', JSON.stringify(pricelist, null, 2))
					replyDeface('*✅〡Successfully activated shop feature*')
		break

        case 'shopmode':
                    if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
			        if (!isFiizu) return reply(mess.ForFiizu)
                    let txshopmode =`*Shop mode*`
                    var bttnshopmode = [{buttonId: ".shopmode.off", buttonText: { displayText: "Turn off" }, type: 1 },
                    {buttonId: ".shopmode.on", buttonText: { displayText: "Turn on" }, type: 1 }]
                    FiizuBot.sendMessage(from, { text: txshopmode, footer: `${isPricelist ? 'Unactive':'Active'}`, buttons: bttnshopmode, mentions: [sender] })
        break

    case 'pichome':
            if (!isFiizu) return reply(mess.ForFiizu)
            let medifa = await downloadAndSaveMediaMessage('image', `./temp/logo.png`)
            replyDeface(myres.succpichome)
    break

    case 'vidhome':
            if (!isFiizu) return reply(mess.ForFiizu)
            let mediaa = await downloadAndSaveMediaMessage('video', `./temp/FiizuBot.mp4`)
            replyDeface(myres.succvidhome)
    break

    case 'join':
            if (!isFiizu) return reply(mess.ForFiizu)
            if (!q) return 
            if (!isUrl(args[0])) return replyDeface(mess.error.Iv)
            var url = args[0]
            url = url.split('https://chat.whatsapp.com/')[1]
            var data = await FiizuBot.groupAcceptInvite(url)
            replyDeface(jsonformat(data))
    break

    case 'out':
        case 'exit':
			    if (!isFiizu) return reply(mess.ForFiizu)
				if (!isGroup) return reply(mess.OnlyGroup)
				FiizuBot.groupLeave(from)
    break

    case 'searchgc': case 'sgc':
            if (!isFiizu) return reply(mess.ForFiizu)
            let gcname = q
            xzons.linkwa(gcname)
            .then(result => {
            replyDeface(result)
            })
    break

    case 'gid': case 'groupid':
            if (!isGroup) return replyDefaceGc(mess.OnlyGroup)
            if (!isFiizu) return reply(mess.ForFiizu)
            reply(myres.succsentgcprivate)
            FiizuBot.sendMessage(`120363027932602232@g.us`, { text: from })
    break

    case 'searchgid': case 'sgid':
            if (!isFiizu) return reply(mess.ForFiizu)
            let data_name = await FiizuBot.groupMetadata(q)
            let data_owner = await FiizuBot.groupMetadata(q)
            var aowner = data_owner.owner
            return replyDeface(data_name.subject)
            .then((res) => repky(`+${aowner ? aowner.split("@")[0] : 'Unknown'}`))
    break

    case 'user':
        case 'register': {
                if (!isFiizu) return reply(mess.ForFiizu)
                if (register.length === 0) return repky(`${mono}[]${mono}`)
                let result = `Fiibot users : ${mono}${register.length}${mono}`
                reply(result)
            }
    break

    case 'crgc':
        case 'crtgc': case 'creategc':
            if (!isFiizu) return reply(mess.ForFiizu)
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

    case 'expto':
            if (!isFiizu) return reply(mess.ForFiizu)
            if (!q) return reply(myres.spamto.noat)
            if (q.startsWith('08')) return reply(myres.spamto.spamnocode)
            if (q.startsWith('+')) return reply(myres.spamto.noplus)
            FiizuBot.sendMessage(`${q}@s.whatsapp.net`, {text: `Waktu sewa kamu di Fiibot dah hampir habis nihh\n\nMau lanjut sewa atw udahan😄`, templateButtons: buttexpto})
            .then((res) => FiizuBot.sendMessage(`${q}@s.whatsapp.net`, {text: `Untuk mengecek waktu sewa, kirim pesan .ceksewa di grup kamu`}, ))
    break

    case 'spamto':
            if (!isFiizu) return reply(mess.ForFiizu)
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

    case 'vps':
        if (!isFiizu) return reply(mess.ForFiizu)
        replyDeface(countdown(11, 23, 2022)).then((res) => repky('Set calendar Nov 23, 2022'))
    break

    case 'restart.0':
        if (!isFiizu) return reply(mess.ForFiizu)
        replyDeface(`_restarting_`)
        .then((res) => exec('pm2 restart 0', (err, stdout) => {
                if (err) return replyDeface(`${err}`)
                if (stdout) replyDeface(`${stdout}`)
            }) )
    break

    case 'restart.1':
        if (!isFiizu) return reply(mess.ForFiizu)
        replyDeface(`_restarting_`)
        .then((res) => exec('pm2 restart 1', (err, stdout) => {
                if (err) return replyDeface(`${err}`)
                if (stdout) replyDeface(`${stdout}`)
            }) )
    break

    default:
    if ((budy) && ["Assalamualaikum", "assalamualaikum", "Assalamu'alaikum", "assalamu'alaikum"].includes(budy) && !isCmd) {
            reply(`Waalaikumsallam wr.wb🙏`)
        }
        if ((budy) && ["Hai", "hai", "Hi", "hi", "Hallo", "hallo", "Halo", "halo"].includes(budy) && !isCmd) {
            reply(`Hayy🙌`)
        }
        if ((budy) && ["Pagi", "pagi", "Siang", "siang", "Sore", "sore", "Malam", "malam"].includes(budy) && !isCmd) {
            reply(`${waktuid}${emojiWaktuid}`)
        }
        if ((budy) && ["Selamat Pagi", "Selamat pagi", "Selamat Siang", "Selamat siang", "Selamat Sore", "Selamat sore", "Selamat Malam", "Selamat malam"].includes(budy) && !isCmd) {
            reply(`Selamat ${waktuid}${emojiWaktuid}`)
        }
    }
}