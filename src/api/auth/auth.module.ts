import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { UserService } from 'src/api/user/user.service'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthGuard } from './auth.guard'
import { JwtAuthModule } from './jwt/jwt.module'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthGuard, UserService],
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
