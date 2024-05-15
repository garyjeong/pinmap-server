import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common'
import {
  InvalidFileExtensionException,
  NoFileException,
  TooLargeFileSizeException,
  TooManyFileException,
} from 'src/commons/custom.error'
import {
  fileMaxCount,
  fileMaxSize,
  fileRegex,
} from 'src/configs/file.config'
import { convertHeictoJPG } from 'src/utils/file.util'

@Injectable()
export class FileValidationPipe
  implements PipeTransform<Express.Multer.File[]>
{
  async transform(
    files: Express.Multer.File | Express.Multer.File[],
    metadata: ArgumentMetadata,
  ): Promise<Express.Multer.File[]> {
    const filesArray = Array.isArray(files) ? files : [files]

    if (!filesArray || filesArray.length === 0) {
      throw new NoFileException()
    }
    if (filesArray.length > fileMaxCount) {
      throw new TooManyFileException()
    }

    const _files: Express.Multer.File[] = await Promise.all(
      filesArray.map(async (file: Express.Multer.File) => {
        if (file.size > fileMaxSize) {
          throw new TooLargeFileSizeException(file.originalname)
        }

        const extension = file.originalname.split('.').pop()
        if (
          !file.mimetype?.startsWith('image') &&
          !fileRegex.test(extension)
        ) {
          throw new InvalidFileExtensionException()
        }

        if (file.mimetype.split('/').pop().toLowerCase() === 'heic') {
          file = await convertHeictoJPG(file)
        }
        return file
      }),
    )
    return _files
  }
}
