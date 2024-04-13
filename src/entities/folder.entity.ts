import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DatetimeColumn } from './common.entity'
import { Photo } from './photo.entity'

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
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '폴더명',
  })
  name: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '폴더 설명',
  })
  description: string

  @OneToMany(() => Photo, (photo) => photo.folder)
  photos: Photo[]
}
