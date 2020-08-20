import { inject, injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import logger from '@shared/utils/logger'
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
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
        name: from?.name || 'Equipe Idvogados',
        address: from?.email || 'contato@idvogados.org'
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
