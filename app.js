const express = require('express')
const healthRoutes = require('./src/routes/health-route')
const errorsMiddleware = require('./src/middlewares/errors-middleware')

const app = express()

// Middlewares
app.use(express.json())

// Rotas
app.use(healthRoutes)

/**
 * Captura de erros.
 * Deve ser feito depois da definição das rotas,
 * para garantir que todo handler de uma rota que
 * lance um erro, tenha esse erro capturado pelo
 * middleware.
 */
app.use(errorsMiddleware)

module.exports = app
