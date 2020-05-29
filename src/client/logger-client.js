const pino = require('pino')
const loggerConfig = require('../config/logger-config')

/** @type {pino.Logger} */
let loggerInstance

const loggerClient = {
  _config: Object.freeze({
    level: loggerConfig.level,
    formatters: {
      level: label => ({ level: label })
    },
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`
  }),

  /**
   * Logger utilizando pinojs
   * See: https://github.com/pinojs/pino
   * @returns {pino.Logger}
   */
  getInstance() {
    loggerInstance = loggerInstance || pino(this._config)
    return loggerInstance
  }
}

module.exports = loggerClient.getInstance()
