const sendgrid = require('@sendgrid/mail')
const sendgridConfig = require('../config/sendgrid-config')
const logger = require('./logger-client')

module.exports = {
  /**
   * Envia email utilizando API do SendGrid
   * https://github.com/sendgrid/sendgrid-nodejs
   *
   * @param {Object} opts Atributos para envio de e-mails
   * @param {string} opts.to E-mail de destino
   * @param {string} opts.subject Título do e-mail
   * @param {string} opts.content Conteúdo do e-mail representado em formato `text/html`
   */
  sendMail({ to, subject, content }) {
    sendgrid.setApiKey(sendgridConfig.apiKey)
    const opts = {
      from: sendgridConfig.fromEmail,
      to,
      subject,
      html: content
    }
    logger.debug({
      action: 'sendgrid-client.sendMail',
      message: 'Sending mail',
      opts
    })
    return sendgrid.send(opts)
  }
}
