import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import * as moment from 'moment'

export namespace GroupRequestDto {
  export class GroupDto {
    @ApiProperty({ description: '그룹명' })
    @IsNotEmpty()
    @IsString()
    name: string

    constructor(id: number, name: string) {
      this.name = name
    }
  }
}

export namespace GroupResponseDto {
  export class Group {
    @ApiProperty({ description: '그룹 아이디' })
    @IsNotEmpty()
    @IsNumber()
    id: number

    @ApiProperty({ description: '그룹명' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ description: '생성일자' })
    @IsNotEmpty()
    @IsString()
    created_at: string

    @ApiProperty({ description: '마지막 수정일자' })
    @IsNotEmpty()
    @IsString()
    updated_at: string

    constructor(
      id: number,
      name: string,
      created_at: Date,
      updated_at?: Date,
    ) {
      this.id = id
      this.name = name
      this.created_at = moment(created_at).format(
        'YYYY-MM-DD HH:mm:ss',
      )
      this.updated_at = updated_at
        ? moment(updated_at).format('YYYY-MM-DD HH:mm:ss')
        : null
    }
  }

  export class Groups {
    groups: Group[]

    constructor(groups: Group[]) {
      this.groups = groups
    }
  }
}
