const expect = require("chai").expect
const axios = require("axios")
const fs = require("fs")
const FormData = require('form-data');
const settings = require("../settings")
const serverTools = require("../lib/util/serverTools")

/////////////////////////////////////////////////////////////////////////

describe("the api path /api/file", function () {

    const urlObj = new URL(settings.baseUrl)
    const authUrl = `${urlObj.protocol}//${settings.auth.user}:${settings.auth.pass}@${urlObj.host}/api`

    describe("the route /api/upload", function () {

        it("should accept and store a file upload", async function () {
            const form = new FormData()
            const file = fs.createReadStream("./test/assets/test.txt", "utf-8")
            form.append("file", file)
            console.log("url", `${authUrl}/upload`)

            const res = await axios({
                method: "POST",
                url: `${authUrl}/upload`,
                data: form,
                headers: {...form.getHeaders()},
            })

            expect(res.data.status).to.equal("ok")
            expect(res.data.url).to.be.a("string")
            expect(res.data.persist).to.equal(false)
            console.log(res.data)
        })

        it("should understand the query param 'persist'", async function () {
            const form = new FormData()
            const file = fs.createReadStream("./test/assets/test.txt", "utf-8")
            form.append("file", file)
            let url = `${authUrl}/upload?persist=1`;
            console.log("url", url)

            const res = await axios({
                method: "POST",
                url: url,
                data: form,
                headers: {...form.getHeaders()},
            })

            expect(res.data.status).to.equal("ok")
            expect(res.data.url).to.be.a("string")
            console.log(res.data)
            expect(res.data.persist).to.equal(true)

        })

    })

})
