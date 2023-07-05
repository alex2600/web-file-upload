const Promise = require("bluebird")
const mongoose = require("mongoose")
mongoose.Promise = Promise // uuuhh yea!
const moment = require("moment")
moment.locale("de")

const settings = require("../../settings")

/////////////////////////////////////////////////////////////////////////

mongoose
   .connect(settings.db.url, {useNewUrlParser: true, useUnifiedTopology: true})
   .catch(function (err) {
      console.error(err)

   })

const File = mongoose.model('File', {
   site: String,
   date: {
      type: Date,
      default: Date.now,
   },
   uploaderIp: String,
   url: String,
   originalName: String,
   filePath: String,
   fileSize: Number,
   mime: String,
   persist: Boolean,
   folder: String,

   mailSent: {
      type: Date,
      default: null,
   },
   created: {
      type: Date,
      default: Date.now,
   },

})

module.exports = {
   File,
}

/////////////////////////////////////////////////////////////////////////



