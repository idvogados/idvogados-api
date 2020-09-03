import {
  IDV_APP_SECRET,
  IDV_TOKEN_EXPIRATION_TIME
} from '@shared/utils/environment'

export default {
  jwt: {
    secret: IDV_APP_SECRET || 'default_test',
    expiresIn: IDV_TOKEN_EXPIRATION_TIME || '1d'
  }
}
