const sinon = require('sinon')
const sendgrid = require('@sendgrid/mail')
const logger = require('../../../src/client/logger-client')
const sendgridConfig = require('../../../src/config/sendgrid-config')
const sendgridClient = require('../../../src/client/sendgrid-client')

describe('[Unit] clients/sendgrid-client', () => {
  describe('.sendMail', () => {
    const stubSend = sinon.stub()
    const spySetApiKey = sinon.spy()
    const spyLoggerDebug = sinon.spy()

    const fixture = {
      to: ['john@doe.io'],
      subject: 'A nice test email',
      content: '<h1> Hello </h1>'
    }

    before(async () => {
      sinon.replace(sendgrid, 'setApiKey', spySetApiKey)
      sinon.replace(sendgrid, 'send', stubSend)
      sinon.replace(logger, 'debug', spyLoggerDebug)

      await sendgridClient.sendMail(fixture)
    })

    after(() => {
      sinon.restore()
    })

    it('shoud setup client with API Key from config', () => {
      const calledCorrectly = spySetApiKey.calledWith(sendgridConfig.apiKey)
      expect(calledCorrectly).to.be.true
    })
    it('should log information in debug mode', () => {
      const calledCorrectly = spyLoggerDebug.calledWith({
        action: 'sendgrid-client.sendMail',
        message: 'Sending mail',
        opts: {
          to: fixture.to,
          from: sendgridConfig.fromEmail,
          subject: fixture.subject,
          html: fixture.content
        }
      })
      expect(calledCorrectly).to.be.true
    })

    it('should send mail with param', () => {
      const calledCorrectly = stubSend.calledWith({
        to: fixture.to,
        from: sendgridConfig.fromEmail,
        subject: fixture.subject,
        html: fixture.content
      })
      expect(calledCorrectly).to.be.true
    })
  })
})
