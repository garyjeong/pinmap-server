import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DatetimeColumn } from './common.entity'
import { UserGroup } from './user-group.entity'

@Entity({
  name: 'group',
  comment: '사용자 그룹 테이블',
})
export class Group extends DatetimeColumn {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: number

  @Column({ length: 20, nullable: false, comment: '그룹 이름' })
  name: string

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group)
  user_groups: UserGroup[]
}
