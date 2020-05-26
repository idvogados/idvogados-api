const supertest = require('supertest')
const httpStatus = require('http-status')
const app = supertest(require('../../app'))

describe('[Acceptance] Healthcheck', () => {
  describe('GET /health', () => {
    let res

    before(async () => {
      res = await app.get('/health')
    })

    it('should return 200', () => {
      expect(res.status).to.be.eql(httpStatus.OK)
    })

    it('should return API status', () => {
      expect(res.body).to.have.property('status', 'ok')
    })
  })
})
