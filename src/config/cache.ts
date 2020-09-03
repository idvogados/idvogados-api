import { RedisOptions } from 'ioredis'
import {
  IDV_REDIS_HOST,
  IDV_REDIS_PORT,
  IDV_REDIS_PASS
} from '@shared/utils/environment'

interface ICacheConfig {
  driver: 'redis'
  config: { redis: RedisOptions }
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: IDV_REDIS_HOST,
      port: Number(IDV_REDIS_PORT),
      password: IDV_REDIS_PASS || undefined
    }
  }
} as ICacheConfig
