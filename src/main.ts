import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import * as dotenv from 'dotenv'
import { ValidationPipe } from '@nestjs/common'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())

  const config = new DocumentBuilder()
    .setTitle('Pinmap Server Swagger')
    .setDescription('The API Documentation for Pinmap Server')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      'Authorization',
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}
bootstrap()
