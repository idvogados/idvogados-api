const envLoader = require('@b2wads/env-o-loader')

/**
 * Configurações do client de log
 * Ref: `src/clients/logger-client.js`
 */
module.exports = envLoader({
  defaults: {
    level: 'debug'
  },
  test: {
    level: 'env:TEST_LOG_LEVEL'
  },
  development: {
    level: 'env:LOG_LEVEL'
  },
  production: {
    level: 'env:LOG_LEVEL'
  }
})
