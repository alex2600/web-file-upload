const db = require("../data/db/db")

/////////////////////////////////////////////////////////////////////////

db.File.find()
    .then(function (files) {
        console.log(JSON.stringify(files, null, "   "))
    })
    .catch(console.error)
    .finally(() => process.exit())
