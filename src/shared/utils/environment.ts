import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config()

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') })

export const {
  PORT,
  APP_SECRET,
  TOKEN_EXPIRATION_TIME,
  APP_WEB_URL,
  APP_API_URL,
  MAIL_DRIVER,
  MAIL_OWNER,
  MAIL_DOMAIN,
  STORAGE_DRIVER,
  AWS_S3_BUCKET_URL,
  AWS_S3_BUCKET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS
} = process.env
