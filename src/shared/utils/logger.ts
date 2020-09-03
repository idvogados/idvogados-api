import Pino from 'pino'
import loggerConfig from '@config/logger'

const logger = Pino(loggerConfig)

export default logger
