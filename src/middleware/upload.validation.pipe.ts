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

@Injectable()
export class FileValidationPipe
  implements PipeTransform<Express.Multer.File[]>
{
  transform(
    files: Express.Multer.File | Express.Multer.File[],
    metadata: ArgumentMetadata,
  ): Express.Multer.File[] {
    const _files = Array.isArray(files) ? files : [files]

    if (!_files || _files.length === 0) {
      throw new NoFileException()
    }
    if (_files.length > fileMaxCount) {
      throw new TooManyFileException()
    }

    _files.map((file: Express.Multer.File) => {
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
    })
    return _files
  }
}
