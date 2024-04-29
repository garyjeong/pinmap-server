import {
  CallHandler,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, finalize, tap } from 'rxjs/operators'
import { DataSource, QueryRunner } from 'typeorm'

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest()
    const queryRunner: QueryRunner =
      await this.dataSource.createQueryRunner()
    try {
      req.queryRunnerManager = queryRunner.manager
      await queryRunner.connect()
      await queryRunner.startTransaction()

      return next.handle().pipe(
        tap(() => queryRunner.commitTransaction()),
        catchError(async (error) => {
          await queryRunner.rollbackTransaction()
          throw error
        }),
        finalize(async () => {
          await queryRunner.release()
        }),
      )
    } catch (error) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      throw error
    }
  }
}

export const TransactionManager = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    return req.queryRunnerManager
  },
)
