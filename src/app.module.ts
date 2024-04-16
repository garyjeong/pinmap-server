import { GroupModule } from './api/group/group.module'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { options } from './configs/database.config'
import { AuthModule } from './api/auth/auth.module'
import { UserModule } from './api/user/user.module'
import { JwtAuthModule } from './api/auth/jwt/jwt.module'
import { LoggerMiddleware } from './middleware/logger.middleware'

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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
