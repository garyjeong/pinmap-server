import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupController } from './group.controller'

import { GroupService } from './group.service'
import { Module } from '@nestjs/common'
import { User } from 'src/entities/user.entity'
import { Group } from 'src/entities/group.entity'
import { UserGroup } from 'src/entities/user-group.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserGroup, Group])],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
