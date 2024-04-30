import { FolderService } from './folder.service'
import { FolderController } from './folder.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
