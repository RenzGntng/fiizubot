const fs = require('fs');

function addPayment(groupID, defaultPay, fiibotPayment, qrisCode, qCodeLink, _db) {
    var obj_add = {
        id: groupID,
        defaultPay: defaultPay,
        fiibotPayment: fiibotPayment,
        qrisCode: qrisCode,
        qCodeLink: qCodeLink
    }
    _db.push(obj_add)
    fs.writeFileSync('./database/fiibot_payment.json', JSON.stringify(_db, null, 3))
}

function getPayment(groupID, defaultPay, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID && _db[x].defaultPay === defaultPay) {
            position = x
        }
    })
    if (position !== null) {
        return _db[position]
    }
}

function alreadyPayment(groupID, defaultPay, _db) {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID && _db[x].defaultPay === defaultPay) {
            found = true
        }
    })
    return found
}

function sendPayment(groupId, defaultPay, _dir) {
    let position = null
    Object.keys(_dir).forEach((x) => {
        if (_dir[x].id === groupId && _dir[x].defaultPay === defaultPay) {
            position = x
        }
    })
    if (position !== null) {
        return _dir[position].fiibotPayment
    }
}

function alreadyGPayment(groupID, _db) {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            found = true
        }
    })
    return found
}

function updatePayment(groupID, defaultPay, fiibotPayment, qrisCode, qCodeLink, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID && _db[x].defaultPay === defaultPay) {
            position = x
        }
    })
    if (position !== null) {
        _db[position].fiibotPayment = fiibotPayment
        _db[position].qrisCode = qrisCode
        _db[position].qCodeLink = qCodeLink
        fs.writeFileSync('./database/fiibot_payment.json', JSON.stringify(_db, null, 3))
    }
}
module.exports = {
    addPayment,
    getPayment,
    alreadyPayment,
    sendPayment,
    alreadyGPayment,
    updatePayment
}
