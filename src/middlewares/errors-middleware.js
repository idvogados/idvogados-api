const httpStatus = require('http-status')
const logger = require('../client/logger-client')
const NotFoundError = require('../errors/not-found-error')

/** Catálogo de erros conhecidos pela aplicação e seus respectivos statusCode */
const ERRORS_CATALOG = Object.freeze([{ error: NotFoundError, statusCode: httpStatus.NOT_FOUND }])

/**
 * Middleware para capturar erros da aplicação
 * e montar um retorno padrão para cada classe de erro mapeada.
 * O erro também é logado no terminal.
 *
 * Caso `err` seja um erro não conhecido,
 * retorna status code `INTERNAL_SERVER_ERROR`
 *
 * @param {Object} err Erro lançado pela aplicação
 * @param {Express.Request} req Request
 * @param {Express.Response} res Response
 * @param {Function} next Função que leva para a próxima execução da stack
 */
module.exports = (err, req, res, next) => {
  const errorMatched = ERRORS_CATALOG.find(e => e.error.name === err.name)
  const statusCode = errorMatched ? errorMatched.statusCode : httpStatus.INTERNAL_SERVER_ERROR

  const errorContent = {
    error: err.name,
    message: err.message
  }

  logger.error({
    ...errorContent,
    statusCode,
    stack: err.stack.split('\n'),
    path: req.originalUrl,
    query: req.query,
    headers: req.headers
  })

  res.setHeader('x-error', true)
  res.status(statusCode).json(errorContent)

  next()
}
