import { APP_SECRET, TOKEN_EXPIRATION_TIME } from '@shared/utils/environment'

export default {
  jwt: {
    secret: APP_SECRET || 'default_test',
    expiresIn: TOKEN_EXPIRATION_TIME || '1d'
  }
}
