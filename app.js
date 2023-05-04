const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const formidable = require("formidable")

const settings = require("./settings")
const cors = require("cors")
const cron = require("./lib/util/cron").init() // init

/////////////////////////////////////////////////////////////////////////

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.set('json spaces', 3)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
// app.use(bodyParser.json({limit: "12GB"})); // not working - still "request entity too large"
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(require('stylus').middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

/////// ROUTES ////////////////////////////////////////////////////////////////

app.use('/api/upload', require("./routes/upload"))
app.use('/api/file', require("./routes/file"))
app.use('/api/version', require("./routes/version"))
app.use('*', function (req, res, next) {
   res.status(500).json({status: "error", message: "Invalid route"})
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   const err = new Error('Not Found')
   err.status = 404
   next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
   app.use(function (err, req, res, next) {
      res.status(err.status || 500)
      res.json({
         status: "error",
         message: err.message,
      })
   })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
   res.status(err.status || 500)
   res.json({
      status: "error",
      message: err.toString(),
   })
})


module.exports = app
