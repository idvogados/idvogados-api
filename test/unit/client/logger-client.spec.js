const loggerConfig = require('../../../src/config/logger-config')
const logger = require('../../../src/client/logger-client')

describe('[Unit] client/logger-client', () => {
  describe('.getInstance', () => {
    it('should instantiate a Pino instance', () => {
      expect(logger.constructor.name).to.be.eql('Pino')
    })

    it('should use level from config', () => {
      expect(logger.level).to.be.eql(loggerConfig.level)
    })
  })
})
