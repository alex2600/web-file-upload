const mime = require("mime-types")
const db = require("../data/db/db")

db.File.find().exec()
    .map(function (file) {
        console.log(file.originalName, file.mime)
        if (!file.mime) {
            file.mime = mime.lookup(file.originalName)
            return file.save()
        }
        return file
    })
    .then(console.log)
    .catch(console.error)
    .finally(function () {
        process.exit()
    })
