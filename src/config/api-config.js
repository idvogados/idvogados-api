const envLoader = require('@b2wads/env-o-loader')

/**
 * Configurações globais da API
 */
module.exports = envLoader({
  defaults: {
    port: 3000,
    isDev: process.env.NODE_ENV !== 'production'
  },
  test: {
    port: 'env:TEST_API_PORT'
  },
  development: {
    port: 'env:API_PORT'
  },
  production: {
    port: 'env:API_PORT'
  }
})
