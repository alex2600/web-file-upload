const nodemailer = require('nodemailer')
const hbs = require("handlebars")
const moment = require("moment")
moment.locale("de")
const fs = require("fs")
const path = require("path")
const _ = require("lodash")
const filesize = require("filesize")
const Table = require("ascii-table")

const log = require("../../logger")
const db = require("../../data/db/db")
const settings = require("../../settings")

/////// EXPORTS ////////////////////////////////////////////////////////////////

module.exports = {
    sendAllMails,
    getMailDataFromFileData,
    sendFilesMail,
    sendMail,
    // createMail: createMailFromTemplate,
}

/////// Options ////////////////////////////////////////////////////////////////

transporter = nodemailer.createTransport(settings.mail.smtp)

// setup e-mail data with unicode symbols
var mailOptions = {
    from: settings.mail.from,
    to: settings.mail.to,
    subject: settings.mail.subject,
    text: null,
};

/////// Templates ////////////////////////////////////////////////////////////////

let templatePath = path.join(__dirname, "./mail-template.hbs")
let templateText = fs.readFileSync(templatePath, "utf-8");

const subjectGen = hbs.compile(mailOptions.subject)
const mailGen = hbs.compile(templateText)

/////// FNs ////////////////////////////////////////////////////////////////

async function sendAllMails() {
    log.info(moment().format("L LTS") + ": sendAllMails...")

    try {
        const files = await db.File.find().lean().where("mailSent").eq(null).select("-__v -mailSent")
        if (files.length) {
            log.info(`${files.length} files without mail sent -> sending mail`)
            const res = await sendFilesMail(files)
            log.info("Mail send ok", res)
            return setMailSent(files)
        }
    } catch (ex) {
        console.error(ex)
    }
}

async function setMailSent(files) {
    await db.File.updateMany({_id: {$in: files.map(f => f._id)}}, {$set: {mailSent: new Date()}})
    // await db.File.updateMany({mailSent: null}, {$set: {mailSent: new Date()}})
    // const dbFiles = await db.File.find().where("_id").in(files.map(f => f._id)).lean()
    // log.info("setMailSent()", JSON.stringify(dbFiles, null, "   "))
}


function sendFilesMail(filesData) {
    const data = getMailDataFromFilesData(filesData)
    const mailSubject = subjectGen(data)
    const mailBody = mailGen(data)
    return sendMail(mailSubject, mailBody)
}

function sendMail(subject, body) {
    const opts = _.clone(mailOptions)
    opts.subject = subject
    opts.text = body
    return new Promise(function (resolve, reject) {
        transporter.sendMail(opts, function (error, info) {
            if (error) {
                console.error(error)
                log.error(error)
                return reject(error)
            }
            const message = info;
            // console.log(message);
            log.info({msg: "sent mail", mail: message})
            return resolve(message)
        });
    })
}

// function createMailFromTemplate(fileData) {
//     const mailData = getMailDataFromFileData(fileData)
//     return mailGen({mailData, dataString: JSON.stringify(fileData, null, "   ")})
// }

function getMailDataFromFilesData(filesData) {
    const files = filesData.map(getMailDataFromFileData)

    const table = new Table()
    table.setHeading("name", "size", "url")
    files.forEach(f => table.addRow(f.originalName, f.fileSize, f.url))

    return {
        files,
        site: settings.baseUrl,
        table: table.toString(),
    }
}

function getMailDataFromFileData(fileData) {
    const obj = {...fileData}
    obj.json = JSON.stringify(obj, null, "   ")
    obj.date = moment(fileData.date).format("L LTS")
    obj.fileSize = filesize(fileData.fileSize)
    return obj
}
