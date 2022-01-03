const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const settings = require("../../settings");

/////////////////////////////////////////////////////////////////////////

module.exports = {
    uploadFile,
}

/////////////////////////////////////////////////////////////////////////

async function uploadFile(fileNameAndPath, persist = false) {
    const urlObj = new URL(settings.baseUrl)
    let authUrl = `${urlObj.protocol}//${settings.auth.user}:${settings.auth.pass}@${urlObj.host}/api`
    if (persist) authUrl = `${authUrl}?persist=1`

    const form = new FormData()
    const file = fs.createReadStream(fileNameAndPath, "utf-8")
    form.append("file", file)
    console.log("url", `${authUrl}/upload`)

    const res = await axios({
        method: "POST",
        url: `${authUrl}/upload`,
        data: form,
        headers: {...form.getHeaders()},
    })
}
