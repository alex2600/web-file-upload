const fileTools = require("../lib/util/fileTools")
const settings = require("../settings")

/////////////////////////////////////////////////////////////////////////

fileTools.findFilesWithoutDbEntry()
    .then(function (files) {
        // files.forEach(console.log)
        // console.log(files[0])
        files.forEach(function (file) {
            console.log(file)
        })
        console.log(files.length)
    })
    .catch(console.error)
    .finally(() => process.exit())
