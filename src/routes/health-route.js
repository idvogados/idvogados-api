const wrap = require('express-async-wrap')
const router = require('express').Router()
const HealthController = require('../api/health-api')

router.get('/health', wrap(HealthController.status))

module.exports = router
