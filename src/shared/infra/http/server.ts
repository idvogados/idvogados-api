import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import '@shared/infra/typeorm'
import '@shared/container'
import uploadConfig from '@config/upload'
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter'
import errorHandling from '@shared/infra/http/middlewares/errorHandling'
import { errors } from 'celebrate'
import { IDV_APP_PORT } from '@shared/utils/environment'
import logger from '@shared/utils/logger'
import routes from './routes'

const app = express()

app.use(rateLimiter)
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)
app.use(errors())
app.use(errorHandling)

app.listen(IDV_APP_PORT || 3333, () => {
  logger.info({
    action: '@shared/infra/http/server.ts',
    message: `Server started on port ${IDV_APP_PORT || 3333}!`
  })
})
