import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DatetimeColumn } from './common.entity'
import { Photo } from './photo.entity'
import { Group } from './group.entity'

@Entity({
  name: 'folder',
  comment: '폴더 테이블',
})
export class Folder extends DatetimeColumn {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '폴더명',
  })
  name: string

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '폴더 설명',
  })
  description: string

  @ManyToOne(() => Group, (group) => group.folders)
  @JoinColumn({
    name: 'group_id',
  })
  group: Group

  @OneToMany(() => Photo, (photo) => photo.folder)
  photos: Photo[]
}
