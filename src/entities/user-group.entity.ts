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

  @Column({ nullable: false, comment: '그룹장 여부' })
  is_owner: boolean

  @ManyToOne(() => User, (user) => user.user_groups)
  users: User[]

  @ManyToOne(() => Group, (group) => group.user_groups)
  group: Group

  @ManyToOne(() => UserGroupStatus)
  @JoinColumn()
  status: UserGroupStatus
}
