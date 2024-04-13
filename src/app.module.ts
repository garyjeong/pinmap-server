import { GroupModule } from './api/group/group.module'
import { GroupController } from './api/group/group.controller'
import { Module, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { options } from './configs/database.config'
import { AuthModule } from './api/auth/auth.module'
import { UserModule } from './api/user/user.module'
import { LoggerModule } from 'nestjs-pino'
import {
  customErrorMessage,
  customLoggerLevel,
  customReceivedMessage,
  customReceivedObject,
  customSuccessMessage,
  customSuccessObject,
} from './configs/logger.config'
import pino from 'pino'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthModule } from './api/auth/jwt/jwt.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtAuthModule,
    TypeOrmModule.forRoot(options),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            level:
              config.get('NODE_ENV') === 'production'
                ? 'info'
                : 'debug',
            wrapSerializers: true,
            customLogLevel: customLoggerLevel,
            customSuccessMessage: customSuccessMessage,
            customSuccessObject: customSuccessObject,
            customReceivedMessage: customReceivedMessage,
            customReceivedObject: customReceivedObject,
            customErrorMessage: customErrorMessage,
            quietReqLogger: false,
          },
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: true,
            },
          },
        }
      },
    }),
    AuthModule,
    UserModule,
    GroupModule,
  ],
  controllers: [GroupController],
})
export class AppModule {}
