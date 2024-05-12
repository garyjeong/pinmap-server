import { PhotoService } from './photo.service'
import { PhotoController } from './photo.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Photo } from 'src/entities/photo.entity'
import { Folder } from 'src/entities/folder.entity'
import { FolderService } from '../folder/folder.service'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [TypeOrmModule.forFeature([Folder, Photo])],
  controllers: [PhotoController],
  providers: [PhotoService, FolderService],
})
export class PhotoModule {}
