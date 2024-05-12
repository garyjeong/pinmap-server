import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage, memoryStorage } from 'multer'
import * as path from 'path'

export const extensions: string[] = ['jpg', 'jpeg', 'png']
export const fileRegex: RegExp = new RegExp(
  `\\.(${extensions.join('|')})$`,
  'i',
)
export const fileMaxCount: number = 5
export const fileMaxSize: number = 5 * 1024 * 1024

export const multerDiskOptions: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const randomName = [...Array(12)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('')
      const extension = path.extname(file.originalname).toLowerCase()
      callback(null, `${randomName}${extension}`)
    },
  }),
}

export const multerMemoryOptions: MulterOptions = {
  storage: memoryStorage,
}
