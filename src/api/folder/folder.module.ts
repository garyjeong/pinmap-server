import { FolderService } from './folder.service'
import { FolderController } from './folder.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Folder } from 'src/entities/folder.entity'
import { Group } from 'src/entities/group.entity'
import { GroupService } from '../group/group.service'

@Module({
  imports: [TypeOrmModule.forFeature([Folder, Group])],
  controllers: [FolderController],
  providers: [FolderService, GroupService],
})
export class FolderModule {}
