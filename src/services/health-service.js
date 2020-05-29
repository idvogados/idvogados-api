const logger = require('../client/logger-client')

module.exports = {
  /**
   * Verifica saúde da API
   * @returns {Promise<Object>} Status da API
   */
  async status() {
    logger.debug({
      action: 'healthService.status',
      msg: 'Checking API health'
    })
    return Promise.resolve({ status: 'ok' })
  }
}
