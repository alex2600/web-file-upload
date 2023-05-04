const basicAuth = require("basic-auth")
const settings = require("../../settings")

/////////////////////////////////////////////////////////////////////////

module.exports = {
   auth,
}

/////////////////////////////////////////////////////////////////////////

function auth (req, res, next) {
   const user = basicAuth(req)
   if (!authOk(user)) {
      return reject(res)
   }
   else {
      next()
   }
}

function authOk (user) {
   return user && user.name === settings.auth.user && user.pass === settings.auth.pass
}

function reject (res) {
   res.set('WWW-Authenticate', `Basic realm="${settings.baseUrl}"`)
   return res.status(401).json({status: "401", message: "auth required"})
}
