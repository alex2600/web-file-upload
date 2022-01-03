const expect = require("chai").expect
const axios = require("axios")
const fs = require("fs")

const settings = require("../settings")

/////////////////////////////////////////////////////////////////////////

describe("the api path /api/file", function () {

    const url = `http://localhost:3002/api`
    const authUrl = `http://${settings.auth.user}:${settings.auth.pass}@localhost:3002/api`

    it("should respond with json", async function () {
        const res = await axios.get(`${authUrl}/file/list`)
        expect(res.status).to.equal(200)
        expect(res.headers["content-type"]).to.include("application/json")
    })

    describe("the route /api/file/list", function () {

        before(async function () {
            try {
                const f = fs.createReadStream("./test/assets/test.txt", "utf-8")
                const ff = await axios.post(`${authUrl}/upload`, f)  // TODO not working, error 500, maybe send as formdata? see https://stackoverflow.com/questions/34357048/nodejs-formdata-file-upload
            } catch (ex) {
                console.error(ex)
                throw ex
            }
        })

        it("should deliver a list of files", async function () {
            // const f = fs.createReadStream("./test/assets/test.txt", "utf-8")
            // const ff = await axios.post(`${authUrl}/upload`, f)  // TODO not working

            const res = await axios.get(`${authUrl}/file/list`)
            expect(res.data.status).to.equal("ok")
            expect(res.data.data).to.be.a("Array")
            const first = res.data.data[0]
            console.log(first)
            expect(first).to.have.property("_id").and.to.be.a("String")
            expect(first).to.have.property("date").and.to.be.a("String")
            expect(first).to.have.property("url").and.to.be.a("String")
            expect(first).to.have.property("originalName").and.to.be.a("String")
            expect(first).to.have.property("fileSize").and.to.be.a("Number")
        })

    })

})
