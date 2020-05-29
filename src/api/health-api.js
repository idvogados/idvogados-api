const httpStatus = require('http-status')
const healthService = require('../services/health-service')

module.exports = {
  /**
   * `GET /health`
   *
   * @param {Express.Request} req Request
   * @param {Express.Response} res Reponse
   * @returns {Promise<Express.Response>} Response HTTP
   */
  async status(req, res) {
    const status = await healthService.status()
    return res.status(httpStatus.OK).json(status)
  }
}
