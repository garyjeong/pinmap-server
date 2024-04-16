import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { DataSource, QueryRunner } from 'typeorm'

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest()

    const queryRunner: QueryRunner = await this.dbInit()

    req.queryRunnerManager = queryRunner.manager

    return next.handle().pipe(
      map(async (data) => {
        await queryRunner.commitTransaction()
        await queryRunner.release()
        return data
      }),
      catchError(async (err) => {
        await queryRunner.rollbackTransaction()
        await queryRunner.release()
        throw err
      }),
    )
  }

  private async dbInit(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    return queryRunner
  }
}
