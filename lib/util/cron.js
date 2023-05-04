const cron = require("node-cron")

const settings = require("../../settings")
// const db = require("../../data/db/db")
const log = require("../../logger")
const mail = require("../mail/mail")
const fileTools = require("./fileTools")

/////////////////////////////////////////////////////////////////////////

module.exports = {init}

/////////////////////////////////////////////////////////////////////////

const tasks = []

/////////////////////////////////////////////////////////////////////////

function init() {
    initDbCleanup()
    initMailSend()
}

function initDbCleanup() {
    log.info(`CRON: init DB cleanup @ '${settings.db.dbCleanupInterval}'`)
    return cron.schedule(settings.db.dbCleanupInterval, fileTools.deleteOldFiles)
}

function initMailSend() {
    log.info(`CRON: init Mail Send @ '${settings.mail.mailSendInterval}'`)
    return cron.schedule(settings.mail.mailSendInterval, mail.sendAllMails)
}

