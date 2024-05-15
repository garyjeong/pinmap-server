import { PhotoService } from './photo.service'
import { PhotoController } from './photo.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Photo } from 'src/entities/photo.entity'
import { Folder } from 'src/entities/folder.entity'
import { FolderService } from '../folder/folder.service'
import { MulterModule } from '@nestjs/platform-express'
import { S3Provider } from 'src/providers/s3.provider'

@Module({
  imports: [TypeOrmModule.forFeature([Folder, Photo])],
  controllers: [PhotoController],
  providers: [PhotoService, FolderService, S3Provider],
})
export class PhotoModule {}
