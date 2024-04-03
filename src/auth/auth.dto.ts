import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export namespace AuthRequestDto {
  export class SignIn {
    @ApiProperty({ description: '이메일' })
    @IsEmail()
    email: string

    @ApiProperty({ description: '비밀번호' })
    @IsString()
    @Length(10)
    password: string
  }

  export class SignUp {
    @ApiProperty({ description: '이메일' })
    @IsEmail()
    email: string

    @ApiProperty({ description: '비밀번호' })
    @IsString()
    @Length(10)
    password: string

    @ApiProperty({ description: '닉네임' })
    @IsString()
    username: string
  }
}

export namespace AuthResponseDto {
  export class Token {
    @ApiProperty({ description: '토큰' })
    @IsString()
    access_token: string

    constructor(access_token: string) {
      this.access_token = access_token
    }
  }
}
