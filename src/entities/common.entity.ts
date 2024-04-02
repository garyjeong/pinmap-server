import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export class ExtendCreateDateColumn {
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date
}

export class DatetimeColumn extends ExtendCreateDateColumn {
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date | null
}
