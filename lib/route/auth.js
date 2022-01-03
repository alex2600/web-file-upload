const basicAuth = require("basic-auth")
const settings = require("../../settings")

/////////////////////////////////////////////////////////////////////////

module.exports = {
    auth,
}

/////////////////////////////////////////////////////////////////////////

function auth(req, res, next) {
    const user = basicAuth(req)
    if (!user) {
        res.set('WWW-Authenticate', 'Basic realm="files.gorillaeis.com"')
        return res.status(401).json({status: "404", message: "auth required"})
    } else if (!(user.name === settings.auth.user && user.pass === settings.auth.pass)) {
        console.log("-----------------------------")
        res.set('WWW-Authenticate', 'Basic realm="files.gorillaeis.com"')
        return res.status(401).json({status: "404", message: "auth required"})
    } else {
        next()
    }
}
