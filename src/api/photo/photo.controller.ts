import {
  Controller,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { PhotoService } from './photo.service'
import { FolderService } from '../folder/folder.service'
import { AuthGuard } from '../auth/auth.guard'
import {
  TransactionInterceptor,
  TransactionManager,
} from 'src/middleware/transaction.interceptor'
import { EntityManager } from 'typeorm'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { FileValidationPipe } from 'src/middleware/upload.validation.pipe'
import { multerDiskOptions } from 'src/configs/file.config'
import { removeTempFiles } from 'src/utils/file.util'

@ApiTags('Photos')
@Controller('photos')
export class PhotoController {
  constructor(
    private photoService: PhotoService,
    private folderService: FolderService,
  ) {}

  @Post('')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', null, multerDiskOptions),
    TransactionInterceptor,
  )
  async createPhotos(
    @TransactionManager() queryRunner: EntityManager,
    @UploadedFiles(FileValidationPipe) files: Express.Multer.File[],
    @Query('f') folder_id: string,
    @Query('g', ParseIntPipe) group_id: number,
  ) {
    const _files: Express.Multer.File[] =
      await this.photoService.getExifData(files)

    removeTempFiles(files)
  }
}
