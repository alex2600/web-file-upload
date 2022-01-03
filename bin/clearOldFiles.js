const fileTools = require("../lib/util/fileTools")
const settings = require("../settings")

/////////////////////////////////////////////////////////////////////////

fileTools.deleteOldFiles()
    .then(function (count) {
        console.log(`removed ${count} files from DB and ${settings.uploadDir}`)
        console.log("DONE")
    })
    .catch(console.error)
    .finally(() => process.exit())
