import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export class DatetimeColumn {
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date | null
}

export class FileDatetimeColumn extends DatetimeColumn {
  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: true,
    comment: '파일 생성 일자',
  })
  created_at: Date

  @CreateDateColumn({ type: 'timestamp' })
  inserted_at: Date
}
