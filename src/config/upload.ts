import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'
import path from 'path'
import { STORAGE_DRIVER } from '@shared/utils/environment'

const tempFolder = path.resolve(__dirname, '..', '..', 'temp')

interface IUploadConfig {
  driver: 'disk'

  tempFolder: string
  uploadsFolder: string

  multer: {
    storage: StorageEngine
  }
  config: { disk: {} }
}

export default {
  driver: STORAGE_DRIVER,

  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      }
    })
  },
  config: {
    disk: {}
  }
} as IUploadConfig
