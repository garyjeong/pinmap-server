import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FileDatetimeColumn } from './common.entity'
import { Folder } from './folder.entity'

@Entity({
  name: 'photo',
  comment: '사진 테이블',
})
export class Photo extends FileDatetimeColumn {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string

  @Column({
    name: 'filename',
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '이미지 파일명',
  })
  filename: string

  @Column({
    name: 'url',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '이미지 업로드 URL',
  })
  url: string

  @Column({
    name: 'latitude',
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
    comment: '이미지 위치 정보의 위도',
  })
  latitude: number

  @Column({
    name: 'longitude',
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
    comment: '이미지 위치 정보의 경도',
  })
  longitude: number

  @ManyToOne(() => Folder, (folder) => folder.photos)
  @JoinColumn({
    name: 'folder_id',
  })
  folder: Folder
}
