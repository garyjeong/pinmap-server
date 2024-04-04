import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DatetimeColumn } from './common.entity'
import { Group } from './group.entity'

@Entity({
  name: 'user',
  comment: '사용자 테이블',
})
export class User extends DatetimeColumn {
  @PrimaryGeneratedColumn('uuid')
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

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user)
  user_groups: UserGroup[]
}

@Entity({
  name: 'user_group_status',
  comment: '사용자 그룹 참여에 대한 상태 테이블',
})
export class UserGroupStatus {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
    nullable: false,
    comment: '그룹 참여 상태명',
  })
  status_name: string
}

@Entity({
  name: 'user_group',
  comment: '사용자와 그룹 중간 테이블',
})
export class UserGroup extends DatetimeColumn {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, comment: '그룹장 여부' })
  is_owner: boolean

  @ManyToOne(() => User, (user) => user.user_groups)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Group, (group) => group.user_groups)
  @JoinColumn({ name: 'group_id' })
  group: Group

  @ManyToOne(() => UserGroupStatus)
  @JoinColumn({ name: 'status_id' })
  status: UserGroupStatus
}
