const _ = require("lodash")
const nconf = require("nconf");

/////////////////////////////////////////////////////////////////////////

let env = process.env["NODE_ENV"]
if (!env) throw new Error("NODE_ENV not defined: " + env)
// if (!env) throw new Error("NODE_ENV required!")
env = env.toLowerCase()
console.log("Using NODE_ENV='%s'", env)

const file = "settings." + env + ".json";
console.log("Reading config file '%s'", file)
nconf.file("prod", file)
nconf.file("default", "settings.default.json")

const settings = nconf.get();
const pubSettings = _.cloneDeep(settings)
delete pubSettings.auth // dont print this
console.log("Using settings:")
console.log(pubSettings)

module.exports = settings
