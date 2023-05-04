const express = require('express')
const router = express.Router();

const {version} = require("../package")

/////////////////////////////////////////////////////////////////////////

// router base is /version
router
    .get("/", getVersion)

module.exports = router;

/////////////////////////////////////////////////////////////////////////

function getVersion(req, res) {
    return res.json({
        status: "ok",
        data: version,
    })

}
