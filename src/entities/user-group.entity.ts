import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DatetimeColumn } from './common.entity'
import { User } from './user.entity'
import { Group } from './group.entity'
import { UserGroupStatus } from './user-group-status.entity'

@Entity({
  name: 'user_group',
  comment: '사용자와 그룹 중간 테이블',
})
export class UserGroup extends DatetimeColumn {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id: number

  @Column({
    name: 'is_owner',
    nullable: false,
    comment: '그룹장 여부',
  })
  is_owner: boolean

  @Column({
    name: 'user_id',
    nullable: false,
    comment: '사용자 아이디',
  })
  user_id: number

  @Column({
    name: 'group_id',
    nullable: false,
    comment: '그룹 아이디',
  })
  group_id: number

  @Column({
    name: 'status_id',
    nullable: false,
    comment: '상태 아이디',
  })
  status_id: number

  @ManyToOne(() => User, (user) => user.user_groups)
  @JoinColumn({ name: 'user_id' })
  users: User[]

  @ManyToOne(() => Group, (group) => group.user_groups)
  @JoinColumn({ name: 'group_id' })
  group: Group

  @ManyToOne(() => UserGroupStatus)
  @JoinColumn({ name: 'status_id' })
  status: UserGroupStatus
}
