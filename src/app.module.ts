import { PhotoModule } from './api/photo/photo.module'
import { FolderModule } from './api/folder/folder.module'
import { GroupModule } from './api/group/group.module'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { options } from './configs/database.config'
import { AuthModule } from './api/auth/auth.module'
import { UserModule } from './api/user/user.module'
import { JwtAuthModule } from './api/auth/jwt/jwt.module'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './middleware/exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtAuthModule,
    TypeOrmModule.forRoot(options),
    AuthModule,
    UserModule,
    GroupModule,
    PhotoModule,
    FolderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
