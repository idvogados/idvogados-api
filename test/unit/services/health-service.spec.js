const healthService = require('../../../src/services/health-service')

describe('[Unit] services/health-service', () => {
  describe('.status', () => {
    it('should return api status ', async () => {
      const status = await healthService.status()
      expect(status).to.have.property('status', 'ok')
    })
  })
})
