import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DatetimeColumn, ExtendCreateDateColumn } from './common.entity'
import { Group } from './group.entity'

@Entity({
  name: 'user',
  comment: '사용자 테이블',
})
export class User extends DatetimeColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, length: 20, nullable: false })
  email: string

  @Column({ length: 255, nullable: true, default: null })
  password: string

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user)
  user_groups: UserGroup[]
}

@Entity({
  name: 'user_group',
  comment: '사용자와 그룹 중간 테이블',
})
export class UserGroup extends ExtendCreateDateColumn {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.user_groups)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Group, (group) => group.user_groups)
  @JoinColumn({ name: 'group_id' })
  group: Group
}
