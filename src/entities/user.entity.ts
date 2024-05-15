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

@Entity({
  name: 'user',
  comment: '사용자 테이블',
})
export class User extends DatetimeColumn {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id: number

  @Column({
    unique: true,
    name: 'email',
    length: 20,
    nullable: false,
    comment: '이메일',
  })
  email: string

  @Column({
    name: 'password',
    length: 255,
    nullable: true,
    default: null,
    comment: '비밀번호, SNS의 경우 Null',
  })
  password: string

  @Column({
    name: 'username',
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
