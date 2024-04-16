import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator'
import * as moment from 'moment'

export namespace UserRequestDto {
  export class PatchUserDto {
    @ApiProperty({ description: '닉네임' })
    @IsString()
    username?: string
  }
}
export namespace UserResponseDto {
  export class User {
    @ApiProperty({ description: '아이디' })
    @IsNotEmpty()
    @IsInt()
    id: number

    @ApiProperty({ description: '이메일' })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ description: '닉네임' })
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty({ description: '생성일' })
    @IsNotEmpty()
    @IsDateString()
    created_at: string

    constructor(
      id: number,
      email: string,
      username: string,
      created_at: Date,
    ) {
      this.id = id
      this.email = email
      this.username = username
      this.created_at = moment(created_at).format(
        'YYYY-MM-DD HH:mm:ss',
      )
    }
  }
}
