import { PhotoService } from './photo.service'
import { PhotoController } from './photo.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
