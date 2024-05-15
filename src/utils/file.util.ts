import { InternalServerErrorException } from '@nestjs/common'
import * as fs from 'fs'
import Jimp from 'jimp'
import * as heicConvert from 'heic-convert'

export const removeTempFiles = async (
  files: Express.Multer.File[],
): Promise<void> => {
  files.forEach((file) => {
    fs.unlinkSync(file.path)
  })
}

export const convertHeictoJPG = async (
  file: Express.Multer.File,
): Promise<Express.Multer.File> => {
  const extPatterns = /\.[^/.]+$/
  const jpgFileName = file.originalname.replace(extPatterns, '.jpg')
  const jpgFilePath = file.path.replace(extPatterns, '.jpg')

  const inputBuffer = fs.readFileSync(file.path)
  const outputBuffer = await heicConvert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 1,
  })

  fs.writeFileSync(jpgFilePath, outputBuffer)
  fs.unlinkSync(file.path)

  return {
    ...file,
    originalname: jpgFileName,
    mimetype: 'image/jpeg',
    path: jpgFilePath,
    filename: jpgFileName,
    size: fs.statSync(jpgFilePath).size,
  }
}
