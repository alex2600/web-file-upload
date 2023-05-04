const express = require('express');
const router = express.Router();
const path = require("path")
const sh = require("shelljs")
const moment = require("moment")
const util = require("util")
const fs = require("fs")
const filesize = require("filesize")
const mongoose = require("mongoose")
const mime = require("mime-types")

const mailer = require("../lib/mail/mail")
const settings = require("../settings")

const db = require("../data/db/db")
const log = require("../logger")

/////////////////////////////////////////////////////////////////////////

router
    .post("/", postFile)

/////////////////////////////////////////////////////////////////////////

module.exports = router;

/////// FNs ////////////////////////////////////////////////////////////////

// filePath ist nur noch der Name der Datei! Pfad muss aus Einstellungen gelesen werden.
function getFileData(_id, fileName, fileSize, filePath, ip, persist) {
    return {
        _id,
        site: settings.baseUrl,
        date: new Date(),
        // date: moment().format("L LTS"),
        url: `${settings.baseUrl}/api/file/${_id}`,
        originalName: fileName,
        mime: mime.lookup(fileName),
        filePath: filePath,
        fileSize: fileSize,
        uploaderIp: ip,
        persist: !!persist,
    }
}

async function postFile(req, res, next) {
    try {

        const file = req.body.file;
        const persist = req.query.persist

        if (!file) return res.status(500).json({
            status: "error",
            message: "no file"
        })

        let _id = mongoose.Types.ObjectId().toString()
        const src = file.path;
        const {size} = fs.statSync(src)
        const trg = path.join(settings.uploadDir, _id);
        const filePath = _id; // pfad wird weggelassen und beim download aus den settings zusammengesetzt
        console.log("moving %s to %s", src, trg)

        sh.mv(src, trg)

        // create file data
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const fileData = getFileData(_id, file.name, size, filePath, ip, persist)

        // save to db
        const dbObj = await new db.File(fileData).save()
        log.info({msg: "adding file", dbObj})

        return res.json({
            status: "ok",
            url: dbObj.url,
            originalName: dbObj.originalName,
            fileSize: dbObj.fileSize,
            date: dbObj.date,
            persist: dbObj.persist,
        })
    } catch (ex) {
        // console.log("......................")
        console.error(ex)
        log.error(ex)

        return res.status(500).json({
            status: "error",
            message: ex.toString()
        })
    }
}
