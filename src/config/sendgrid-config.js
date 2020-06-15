const envLoader = require('@b2wads/env-o-loader')

/**
 * Configurações do serviço de e-mail SendGrid
 */
module.exports = envLoader({
  defaults: {
    apiKey: 'dummy-api-key',
    fromEmail: 'contato@idvogados.org'
  },
  test: {
    apiKey: 'env:TEST_SENDGRID_API_KEY',
    fromEmail: 'env:TEST_SENDGRID_FROM_EMAIL'
  },
  development: {
    apiKey: 'env:SENDGRID_API_KEY',
    fromEmail: 'env:SENDGRID_FROM_EMAIL'
  },
  production: {
    apiKey: 'env:SENDGRID_API_KEY',
    fromEmail: 'env:SENDGRID_FROM_EMAIL'
  }
})
