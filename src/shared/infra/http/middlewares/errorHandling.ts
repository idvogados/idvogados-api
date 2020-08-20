import { Request, Response, NextFunction } from 'express'
import AppError from '@shared/errors/AppError'
import logger from '@shared/utils/logger'

export default function errorHandling(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Response<any> {
  const { message } = err
  const stack = err.stack?.split('\n')

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message })
  }

  logger.error({
    action: '@shared/infra/http/middlewares/errorHandling.ts',
    err,
    message,
    stack
  })

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}
