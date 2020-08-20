import { IDV_MAIL_DRIVER } from '@shared/utils/environment'

interface IMailConfig {
  driver: 'ethereal' | 'custom'
}

export default {
  driver: IDV_MAIL_DRIVER || 'ethereal'
} as IMailConfig
