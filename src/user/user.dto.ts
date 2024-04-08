import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export namespace UserResponseDto {
  export class User {
    @ApiProperty({ description: '아이디' })
    @IsNotEmpty()
    @IsString()
    public id: string

    @ApiProperty({ description: '이메일' })
    @IsNotEmpty()
    @IsEmail()
    public email: string

    @ApiProperty({ description: '닉네임' })
    @IsNotEmpty()
    @IsString()
    public username: string

    @ApiProperty({ description: '생성일' })
    @IsNotEmpty()
    @IsDateString()
    public created_at: Date

    constructor(
      id: string,
      email: string,
      username: string,
      created_at: Date,
    ) {
      this.id = id
      this.email = email
      this.username = username
      this.created_at = created_at
      Object.seal(this)
    }
  }
}
