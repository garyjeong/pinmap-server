import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator'
import * as moment from 'moment'

export namespace FolderRequestDto {
  export class Folder {
    @ApiProperty({ description: '폴더명' })
    @IsNotEmpty()
    @IsString({ message: '폴더명은 필수입니다.' })
    name: string

    @ApiProperty({ description: '폴더 설명' })
    @IsString()
    description?: string
  }
}

export namespace FolderResponseDto {
  export class Folder {
    @ApiProperty({ description: '폴더 아이디' })
    @IsNotEmpty()
    @IsUUID()
    id: string

    @ApiProperty({ description: '폴더명' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ description: '폴더 설명' })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({ description: '그룹 아이디' })
    @IsNotEmpty()
    @IsNumber()
    group_id: number

    @ApiProperty({ description: '생성일자' })
    @IsNotEmpty()
    @IsString()
    created_at: string

    @ApiProperty({ description: '마지막 수정일자' })
    @IsNotEmpty()
    @IsString()
    updated_at: string

    constructor(
      id: string,
      name: string,
      description: string,
      group_id: number,
      created_at: Date,
      updated_at?: Date,
    ) {
      this.id = id
      this.name = name
      this.description = description
      this.group_id = group_id
      this.created_at = moment(created_at).format(
        'YYYY-MM-DD HH:mm:ss',
      )
      this.updated_at = updated_at
        ? moment(updated_at).format('YYYY-MM-DD HH:mm:ss')
        : null
    }
  }

  export class Folders {
    folders: Folder[]

    constructor(folders: Folder[]) {
      this.folders = folders
    }
  }
}
