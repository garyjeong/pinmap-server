import {
  CallHandler,
  createParamDecorator,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { firstValueFrom, Observable } from 'rxjs'
import { catchError, finalize, tap } from 'rxjs/operators'
import { DataSource, QueryRunner } from 'typeorm'

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
        if (err instanceof HttpException) {
          throw new HttpException(err.getResponse(), err.getStatus())
        } else {
          throw new InternalServerErrorException(err)
        }
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
