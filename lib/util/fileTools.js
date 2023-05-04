const del = require("del")
const moment = require("moment")
moment.locale("de")
const fsExtra = require("fs-extra")
const path = require("path")
const glob = require("fast-glob")

const db = require("../../data/db/db")
const log = require("../../logger")
const settings = require("../../settings")

/////////////////////////////////////////////////////////////////////////

module.exports = {
    deleteFile,
    deleteFileFromDisk,
    deleteFileFromDb,
    deleteOldFiles,
    deleteAllFiles,
    findFilesWithoutDbEntry,
    deleteAllFilesWithoutDbEntry,
}

/////////////////////////////////////////////////////////////////////////

async function deleteAllFilesWithoutDbEntry() {
    const files = await findFilesWithoutDbEntry()
    for(const file of files) {
        del.sync(file, {
            onlyFiles: true,
            force: true, // needed when deleting outside of working dir
        })
    }
    return files
}

async function findFilesWithoutDbEntry() {
    const fsFiles = await getFsFiles()
    const filesFound = []  // files without a db entry and only a file system file
    for (const filePath of fsFiles) {
        // e.g. filePath = /mnt/voln154377a1/file-upload/615b4bae14fe9d073f395449
        const fileName = filePath.split("/").pop()
        const dbFile = await db.File.findOne({filePath: fileName}).lean().select("filePath")
        if (dbFile) {
            // ok do nothing
        } else {
            filesFound.push(filePath)
        }
    }
    return filesFound
}

async function getFsFiles() {
    const dir = settings.uploadDir
    return glob(`${dir}/**`, {onlyFiles: true});
}

async function deleteFileFromDisk(file) {
    const fileName = file.filePath
    const filePath = path.join(settings.uploadDir, fileName)
    del.sync(filePath, {onlyFiles: true, force: true})
    return filePath
}

async function deleteFileFromDb(_id) {
    const file = db.File.findOneAndDelete({_id})
    return file
}

async function deleteFile(_id) {
    const file = await deleteFileFromDb(_id)
    await deleteFileFromDisk(file)
    return file
}

// remove old db entries and files
async function deleteOldFiles() {
    log.info("START: deleteOldFiles()")
    try {
        const stringDuration = settings.db.fileMaxAge
        const duration = moment.duration(stringDuration)
        const expDate = moment().subtract(duration)
        console.log("expDAte", expDate.format("L LTS"))

        const files = await db.File
            .find()
            .where("date")
            .lt(expDate.toDate())
            .where("persist")
            .equals(false)

        console.log(files)
        // delete fs files
        const fsDeleted = []
        for (let file of files) {
            fsDeleted.push(await deleteFile(file._id))
        }

        log.info("SUCCESS: deleteOldFiles deleted files", {fsDeleted, dbDeleted: files})
        return files.length
    } catch (ex) {
        console.error(ex)
        log.error("FAILED: deleteOldFiles", {ex})
    }
}

function deleteAllFiles() {
    let deletedCount = 0
    return db.File.remove()
        .then(function (res) {
            deletedCount = res.deletedCount
            return fsExtra.emptyDir(settings.uploadDir)
        })
        .then(function () {
            return deletedCount
        })
}

