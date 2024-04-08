import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'user_group_status',
  comment: '사용자 그룹 참여에 대한 상태 테이블',
})
export class UserGroupStatus {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id: number

  @Column({
    length: 100,
    nullable: false,
    comment: '그룹 참여 상태명',
  })
  status_name: string
}
