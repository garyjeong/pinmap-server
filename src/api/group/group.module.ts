import { GroupController } from './group.controller'
import { GroupService } from './group.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
