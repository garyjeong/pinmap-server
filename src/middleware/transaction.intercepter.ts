import {
  CallHandler,
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { DataSource } from 'typeorm'

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.startTransaction()
    req.queryRunner = queryRunner.manager

    return next.handle().pipe(
      catchError(async (err) => {
        await queryRunner.rollbackTransaction()
        await queryRunner.release()
        throw new HttpException(
          err.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }),
      tap(async () => {
        await queryRunner.commitTransaction()
        await queryRunner.release()
      }),
    )
  }
}

export const TransactionManager = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    return req.queryRunner
  },
)
