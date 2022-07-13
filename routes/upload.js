const express = require('express')
const router = express.Router()
const path = require("path")
const sh = require("shelljs")
const fs = require("fs")
const mongoose = require("mongoose")
const mime = require("mime-types")
const formidable = require("formidable")

const mailer = require("../lib/mail/mail")
const settings = require("../settings")

const db = require("../data/db/db")
const log = require("../logger")

/////////////////////////////////////////////////////////////////////////

router
   .post("/", parseForm)
   .post("/", postFile)

/////////////////////////////////////////////////////////////////////////

module.exports = router

/////// FNs ////////////////////////////////////////////////////////////////

// filePath ist nur noch der Name der Datei! Pfad muss aus Einstellungen gelesen werden.
function getFileData (_id, fileName, fileSize, filePath, ip, persist) {
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

function parseForm (req, res, next) {
   const form = formidable({multiples: false})
   form.parse(req, (err, fields, files) => {
      if (err) {
         return next(err)
      }
      else {
         req.body.file = files.file
         return next()
      }
   })
}

async function postFile (req, res, next) {
   try {

      // -> FILE LOOKS LIKE THIS
      // PersistentFile {
      //    _events: [Object: null prototype] { error: [Function (anonymous)] },
      //    _eventsCount: 1,
      //       _maxListeners: undefined,
      //       lastModifiedDate: 2022-07-13T17:05:02.730Z,
      //       filepath: 'C:\\Users\\alex\\AppData\\Local\\Temp\\cdec4a4f6a8fbd9114bcdd900',
      //       newFilename: 'cdec4a4f6a8fbd9114bcdd900',
      //       originalFilename: '2022-06-09__18-43-57__43__EYE2.mp4',
      //       mimetype: 'video/mp4',
      //       hashAlgorithm: false,
      //       size: 84548888,
      //       _writeStream: WriteStream {
      //

      const file = req.body.file
      const persist = req.query.persist

      if (!file) {
         return res.status(500).json({
            status: "error",
            message: "no file"
         })
      }

      let _id = mongoose.Types.ObjectId().toString()
      const src = file.filepath
      // const {size} = fs.statSync(src)
      const trg = path.join(settings.uploadDir, _id)
      const filePath = _id // pfad wird weggelassen und beim download aus den settings zusammengesetzt
      console.log("moving %s to %s", src, trg)

      sh.mv(src, trg)

      // create file data
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const fileData = getFileData(_id, file.originalFilename, file.size, filePath, ip, persist)

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
