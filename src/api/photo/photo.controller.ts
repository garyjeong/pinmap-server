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
import { S3Provider } from 'src/providers/s3.provider'
import { SuccessResponse } from 'src/commons/common.response'

@ApiTags('Photos')
@Controller('photos')
export class PhotoController {
  constructor(
    private photoService: PhotoService,
    private folderService: FolderService,
    private readonly s3Provider: S3Provider,
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
    @Query('g', ParseIntPipe) groupId: number,
    @Query('f') folderId: string,
  ): Promise<SuccessResponse> {
    const _files: Express.Multer.File[] =
      await this.photoService.getExifData(files)

    await Promise.all(
      _files.map(async (file: Express.Multer.File) => {
        const _upload: AWS.S3.ManagedUpload.SendData =
          await this.s3Provider.uploadPhotoFile(
            folderId,
            file.path,
            file.mimetype,
            file.originalname,
          )
        await this.photoService.createPhotosData(
          queryRunner,
          folderId,
          file,
          _upload.Location,
        )
      }),
    ).then(() => {
      removeTempFiles(files)
    })
    return new SuccessResponse(true)
  }
}
