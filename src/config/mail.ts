import { MAIL_DRIVER } from '@shared/utils/environment'

interface IMailConfig {
  driver: 'ethereal' | 'custom'
}

export default {
  driver: MAIL_DRIVER || 'ethereal'
} as IMailConfig
