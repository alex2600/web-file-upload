const fs = require("fs")
const db = require("../data/db/db")
const settings = require("../settings")
const tools = require("../lib/util/tools")

/////////////////////////////////////////////////////////////////////////

tools.getFileCount()
    .then(console.log)
    .catch(console.error)
    .finally(() => process.exit())
