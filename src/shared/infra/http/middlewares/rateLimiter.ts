import { Request, Response, NextFunction } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import redis from 'redis'
import AppError from '@shared/errors/AppError'
import {
  IDV_REDIS_HOST,
  IDV_REDIS_PORT,
  IDV_REDIS_PASS
} from '@shared/utils/environment'

const redisClient = redis.createClient({
  host: IDV_REDIS_HOST,
  port: Number(IDV_REDIS_PORT),
  password: IDV_REDIS_PASS || undefined
})

// TODO limitar requisição por tempo caso o usuário persista 5/1 requisições.
const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip)
    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
