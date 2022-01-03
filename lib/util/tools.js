const du = require("du")
const filesize = require("filesize")
const fs = require("fs")

const settings = require("../../settings")
const db = require("../../data/db/db")

/////////////////////////////////////////////////////////////////////////

module.exports = {
    getFolderSize,
    getFileCount,
}

/////////////////////////////////////////////////////////////////////////

function getFolderSize() {
    return du(settings.uploadDir)
}

function getFileCount() {
    return db.File
        .count()
        .then(function (count) {
            const files = fs.readdirSync(settings.uploadDir)
            return {
                dbFileCount: count,
                fsFileCount: files.length
            }
        })
}
