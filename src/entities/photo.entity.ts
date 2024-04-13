import {
  Column,
  Entity,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { DatetimeColumn } from './common.entity'
import { Group } from './group.entity'
import { Folder } from './folder.entity'

@Entity({
  name: 'photo',
  comment: '사진 테이블',
})
export class Photo extends DatetimeColumn {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '이미지 파일명',
  })
  filename: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '이미지 업로드 URL',
  })
  url: string

  @Column({
    type: 'datetime',
    nullable: false,
    comment: '이미지 생성 일자',
  })
  image_date: Date

  @Column({
    type: 'point',
    nullable: true,
    comment: '이미지 위치 정보',
  })
  image_location: Point

  @Column({
    type: 'int',
    nullable: false,
    comment: '이미지가 업로드된 그룹 아이디',
  })
  group_id: number

  @ManyToOne(() => Folder, (folder) => folder.photos)
  folder: Folder
}
