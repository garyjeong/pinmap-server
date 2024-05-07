import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { UserService } from 'src/api/user/user.service'

import { AuthGuard } from './auth.guard'
import { GroupService } from '../group/group.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthGuard, UserService, GroupService],
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
