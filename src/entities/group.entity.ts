import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DatetimeColumn } from './common.entity'
import { UserGroup } from './user.entity'

@Entity({
  name: 'group',
  comment: '사용자 그룹 테이블',
})
export class Group extends DatetimeColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 20, nullable: false })
  name: string

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group)
  user_groups: UserGroup[]
}
