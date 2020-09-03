import { LoggerOptions } from 'pino'
import { IDV_LOGGER_NAME, IDV_LOGGER_LEVEL } from '@shared/utils/environment'

export default {
  name: IDV_LOGGER_NAME || 'idvogados-server',
  level: IDV_LOGGER_LEVEL || 'debug',
  formatters: {
    level: label => ({ level: label })
  },
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`
} as LoggerOptions
