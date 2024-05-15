import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const { ip, method, originalUrl } = request
    const userAgent = request.get('user-agent') || ''

    response.on('finish', () => {
      const { statusCode } = response

      if (statusCode === 500) {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} - ${response.locals.errorMessage}`,
        )
      } else {
        this.logger.verbose(
          `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`,
        )
      }
    })
    next()
  }
}
