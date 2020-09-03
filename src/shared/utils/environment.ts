import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config()

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') })

export const {
  IDV_APP_PORT,
  IDV_APP_SECRET,
  IDV_TOKEN_EXPIRATION_TIME,
  IDV_APP_WEB_URL,
  IDV_APP_API_URL,
  IDV_LOGGER_NAME,
  IDV_LOGGER_LEVEL,
  IDV_MAIL_DRIVER,
  IDV_MAIL_HOST,
  IDV_MAIL_PORT,
  IDV_MAIL_SECURE,
  IDV_MAIL_AUTH_USER,
  IDV_MAIL_AUTH_PASS,
  IDV_MAIL_DEFAULT_NAME,
  IDV_MAIL_DEFAULT_EMAIL,
  IDV_STORAGE_DRIVER,
  IDV_REDIS_HOST,
  IDV_REDIS_PORT,
  IDV_REDIS_PASS
} = process.env
