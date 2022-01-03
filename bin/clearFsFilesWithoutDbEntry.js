const fileTools = require("../lib/util/fileTools")
const settings = require("../settings")
const Promise = require("bluebird")
const prompts = require("prompts")

/////////////////////////////////////////////////////////////////////////

console.log()
console.log("!!! ATTENTION !!!")
console.log(`DELETING orphaned files in dir '${settings.uploadDir}'`)
console.log("--------------------------------------------------------------")

prompts({
    type: 'confirm',
    name: 'value',
    message: 'Continue?',
    initial: true
})
    .then(function (res) {
        console.log(res)
        if (!res.value) throw "canceled"
        return fileTools.deleteAllFilesWithoutDbEntry()
        // return fileTools.findFilesWithoutDbEntry()
    })
    .then(function (files) {
        console.log(`DELETED ${files.length} files`)
    })
    .catch(console.error)
    .finally(() => process.exit())
