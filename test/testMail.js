const expect = require("chai").expect
const mail = require("../lib/mail/mail")

const settings = require("../settings")

/////////////////////////////////////////////////////////////////////////

describe("the mail lib", function () {

   this.timeout(10000)

   it("should send an email to the specified recipient in the settings", async function () {
      const res = await mail.sendMail("test", "test 123\r\nasdf bingo")
      // console.log(res)
      expect(res).to.be.a("object")
      expect(res).to.have.property("accepted").and.to.be.a("array").and.to.have.length.above(0)
      expect(res).to.have.property("messageId").and.to.be.a("string").and.to.have.length.above(0)
   })

})
