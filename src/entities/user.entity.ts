import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DatetimeColumn } from './common.entity'
import { UserGroup } from './user-group.entity'
import { UUID } from 'crypto'

@Entity({
  name: 'user',
  comment: '사용자 테이블',
})
export class User extends DatetimeColumn {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: string

  @Column({
    unique: true,
    length: 20,
    nullable: false,
    comment: '이메일',
  })
  email: string

  @Column({
    length: 255,
    nullable: true,
    default: null,
    comment: '비밀번호, SNS의 경우 Null',
  })
  password: string

  @Column({
    length: 255,
    nullable: true,
    default: null,
    comment: '닉네임',
  })
  username: string

  @OneToMany(() => UserGroup, (usergroup) => usergroup.users, {
    nullable: true,
  })
  user_groups?: UserGroup[]
}
