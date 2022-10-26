exports.allMenu = (waktu, emojiWaktu, pushname, jam, tanggal, isFiizu, readhome) => {
    return` *🏡 Fiibot Homepage ✨*

 ${emojiWaktu} Good ${waktu} ${isFiizu ? 'Fiizu' : pushname.slice(0, 10)}
 
 🕒 ${jam}
 🗓️ ${tanggal}

${readhome}
  🍄  *Fiibot*  ✨
 🎋  bot
 🎋 .home
 🎋 .homepage
 🎋 .help
 🎋 .rate
 🎋 .rating
 🎋 .profile
 🎋 .info
 🎋 .product
 🎋 .produk
 🎋 .mygc
 🎋 .mygroup
 🎋 .owner
 🎋 .creator
 🎋 .speed
 🎋 .ping
 🎋 .runtime
 🎋 .rentalbot
 🎋 .fiizucmd


  🍄  *Shop*  ✨
 🎋 .list
 🎋 .shop
 🎋 .menu
 🎋 .addlist
 🎋 .rename
 🎋 .renamelist
 🎋 .upd
 🎋 .updlist
 🎋 .updatelist
 🎋 .changelist
 🎋 .dellist
 🎋 .deletelist


  🍄  *Proses*  ✨
 🎋  p
 🎋  proses
 🎋 .setproses
 🎋 .changeproses
 🎋 .updateproses
 🎋 .updproses
 🎋 .getproses
 🎋 .checkproses
 🎋 .cekproses
 🎋 .resetproses


  🍄  *Done*  ✨
 🎋  d
 🎋  done
 🎋 .setdone
 🎋 .changedone
 🎋 .updatedone
 🎋 .upddone
 🎋 .getdone
 🎋 .checkdone
 🎋 .cekdone
 🎋 .resetdone
 

  🍄  *Nick*  ✨
 🎋 .ml
 🎋 .ff
 🎋 .pubg
 🎋 .codm
 🎋 .genshin
 🎋 .higgs
 🎋 .sausage
 🎋 .supersus


  🍄  *Welcome*  ✨
 🎋 .welcome
 🎋 .setwelcome
 🎋 .changewelcome
 🎋 .updatewelcome
 🎋 .updwelcome
 🎋 .getwelcome
 🎋 .checkwelcome
 🎋 .cekwelcome
 🎋 .resetwelcome


  🍄  *Leave*  ✨
 🎋 .leave
 🎋 .setleave
 🎋 .changeleave
 🎋 .updateleave
 🎋 .updleave
 🎋 .getleave
 🎋 .checkleave
 🎋 .cekleave
 🎋 .resetleave


  🍄  *Open*  ✨
 🎋 .open
 🎋 .buka
 🎋 .setopen
 🎋 .changeopen
 🎋 .updateopen
 🎋 .updopen
 🎋 .getopen
 🎋 .checkopen
 🎋 .cekopen
 🎋 .resetopen


  🍄  *Close*  ✨
 🎋 .close
 🎋 .tutup
 🎋 .setclose
 🎋 .changeclose
 🎋 .updateclose
 🎋 .updclose
 🎋 .getclose
 🎋 .checkclose
 🎋 .cekclose
 🎋 .resetclose


  🍄  *Group*  ✨
 🎋 .afk
 🎋 .off
 🎋 .offline
 🎋 .break
 🎋 .del
 🎋 .delete
 🎋 .h
 🎋 .hidetag
 🎋 .listadmin
 🎋 .rentcheck
 🎋 .rentcek
 🎋 .cekrent


  🍄  *Setgroup*  ✨
 🎋 .groupicon
 🎋 .groupname
 🎋 .groupdesc
 🎋 .changelink
 🎋 .grouplink
 🎋 .addadmin
 🎋 .deladmin 


  🍄  *Antilink*  ✨
 🎋 .antilink
 🎋 .antiwame
 🎋 .antialllink
 🎋 .antilinkall
 🎋 .antivirus
 🎋 .antivirtext
 
 
  🍄  *Tool*  ✨
 🎋 .s
 🎋 .sticker
 🎋 .tourl
 🎋 .toimage
 🎋 .tovideo
 🎋 .toaudio
 🎋 .cal
 🎋 .calculator
 🎋 .kalkulator`
}

exports.fiizumenu = (pushname, ownerNumber) => {
    return`  🍄  *Group*  ✨
 🎋 .join
 🎋 .gid
 🎋 .sgid
 🎋 .sgc
 🎋 .crgc
 🎋 .glink


  🍄  *Rental*  ✨
 🎋 .rbc
 🎋 .addr
 🎋 .rtime
 🎋 .stopr
 🎋 .stoprlink
 🎋 .rlist


  🍄  *Picture*  ✨
 🎋 .picbot
 🎋 .picbot -long


  🍄  *Home*  ✨
 🎋 .pichome
 🎋 .vidhome


  🍄  *Other*  ✨
 🎋 .expto
 🎋 .spamto`
}

exports.txtprofile = (botName, ownerName, register, version, updateon, releasedon) => {
    return`*Profile*
• Name  :  ${botName}
• Type   :  Online shop
• Prefix  :  Multi
• Mode  :  All Public

*Information*
• Version  :  ${version}
• Update  :  ${updateon}
• Released  :  ${releasedon}
• Server  :  VPS
• Working time  :  24 hours
• Fiibot user  : ${register.length}`
}