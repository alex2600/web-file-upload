const express = require('express');
const router = express.Router();

const mailer = require("../lib/mail/mail")
const settings = require("../settings")

const db = require("../data/db/db")
const log = require("../logger")

/////////////////////////////////////////////////////////////////////////

router
    .get('/', function (req, res, next) {
        var data = {
            title: settings.title,
        };
        res.render('index', data);
    })

/////////////////////////////////////////////////////////////////////////

module.exports = router;
