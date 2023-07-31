var express = require('express')
var router = express.Router()

const db = require("../data/db/db")
const log = require("../logger")
const tools = require("../lib/util/tools")
const mail = require("../lib/mail/mail")
const settings = require("../settings")
const {auth} = require("../lib/route/auth")
const fileTools = require("../lib/util/fileTools")

/////////////////////////////////////////////////////////////////////////

// router base is /file
router
   .get("/list", auth, listFiles)
   .get("/mime", auth, listMimeTypes)
   .get("/count", auth, countFiles)
   .get("/size", auth, folderSize)

   .get('/:_id', getFile)

   .delete("/:_id", auth, async function (req, res, next) {
      const _id = req.params._id
      const dat = await fileTools.deleteFile(_id)
      return res.json({
         status: "ok",
         data: dat
      })
   })

module.exports = router

/////////////////////////////////////////////////////////////////////////

async function listFiles (req, res, next) {
   try {
      const type = req.query.type

      let q = db.File.find().select("-__v -filePath").sort("-date").lean()
      if (type === "media") {
         q.where({mime: /^video|^image/})
      }
      let files = await q

      return res.json({
         status: "ok",
         data: files
      })
   } catch (ex) {
      console.error(ex)
      res.status(500).json({
         status: "error",
         message: ex
      })
   }
}

async function listMimeTypes (req, res) {
   try {
      let mimeTypes = await db.File.aggregate([
         {$sortByCount: "$mime"},
         {$project: {type: "$_id", count: "$count", _id: 0}}
      ])
      return res.json({
         status: "ok",
         data: mimeTypes,
      })
   } catch (ex) {
      console.error(ex)
      res.status(500).json({
         status: "error",
         message: ex
      })
   }
}

async function countFiles (req, res, next) {
   try {
      const count = await tools.getFileCount()
      return res.json(count)
   } catch (ex) {
      console.log("-----------------------")
      console.error(ex)
      res.status(500).json({
         status: "error",
         message: ex.toString()
      })
   }
}

async function folderSize (req, res, next) {
   try {
      const size = await tools.getFolderSize()
      return res.json(size)
   } catch (ex) {
      console.error(ex)
      res.status(500).json({
         status: "error",
         message: ex
      })
   }
}

async function getFile (req, res, next) {
   try {
      const _id = req.params._id
      const type = req.query.type || "raw" // raw=file itself, data=db entry of file
      const data = await db.File.findOne({_id})
      console.log("GET /:id", _id, data)
      if (!data) {
         log.error(`404: GET /file/${_id}`)
         next()
      }
      else {
         if (type === "raw") {
            let message = `⤓ downloading file '${data.filePath}' as '${data.originalName}' from '${req.ip}'`
            console.log(message)
            log.info(message)
            const physicalPath = settings.uploadDir + "/" + data.filePath
            return res.download(physicalPath, data.originalName)
         }
         else if (type === "data") {
            return res.json(data)
         }
      }
   } catch (ex) {
      return res.status(500).json({
         status: "error",
         message: "something is wrong with your file-id"
      })
   }
}
