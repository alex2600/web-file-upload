const fs = require("fs")
const du = require("du")
const filesize = require("filesize")

const db = require("../data/db/db")
const settings = require("../settings")
const tools = require("../lib/util/tools")

/////////////////////////////////////////////////////////////////////////

tools.getFolderSize()
    .then(function (size) {
        console.log(filesize(size))
    })
    .catch(console.error)
    .finally(() => process.exit())
