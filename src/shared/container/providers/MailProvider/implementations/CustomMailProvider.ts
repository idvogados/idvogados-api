import { inject, injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import {
  IDV_MAIL_DEFAULT_NAME,
  IDV_MAIL_DEFAULT_EMAIL,
  IDV_MAIL_HOST,
  IDV_MAIL_PORT,
  IDV_MAIL_SECURE,
  IDV_MAIL_AUTH_USER,
  IDV_MAIL_AUTH_PASS
} from '@shared/utils/environment'
import logger from '@shared/utils/logger'
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
export default class CustomMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host || IDV_MAIL_HOST,
        port: account.smtp.port || Number(IDV_MAIL_PORT),
        secure: account.smtp.secure || Boolean(IDV_MAIL_SECURE),
        auth: {
          user: account.user || IDV_MAIL_AUTH_USER,
          pass: account.pass || IDV_MAIL_AUTH_PASS
        }
      })

      this.client = transporter
    })
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || IDV_MAIL_DEFAULT_NAME || 'Equipe Idvogados',
        address:
          from?.email || IDV_MAIL_DEFAULT_EMAIL || 'contato@idvogados.org'
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })
    logger.debug({
      action:
        '@shared/container/providers/MailProvider/implementations/CustomMailProvider.ts',
      message: `Message sent: ${message.messageId}`
    })
    logger.debug({
      action:
        '@shared/container/providers/MailProvider/implementations/CustomMailProvider.ts',
      message: `Preview URL: ${nodemailer.getTestMessageUrl(message)}`
    })
  }
}
