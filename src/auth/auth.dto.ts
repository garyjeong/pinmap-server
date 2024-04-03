import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator'

export namespace AuthRequestDto {
  export class SignIn {
    @ApiProperty({ description: '이메일' })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ description: '비밀번호' })
    @IsNotEmpty()
    @IsStrongPassword(
      {
        minLength: 10,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      },
      {
        message:
          '비밀번호는 최소한 1개 이상의 숫자와 대문자, 특수문자가 모두 포함되고 10자리 이상이어야 합니다.',
      },
    )
    password: string
  }

  export class SignUp {
    @ApiProperty({ description: '이메일' })
    @IsNotEmpty()
    @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
    email: string

    @ApiProperty({ description: '비밀번호' })
    @IsNotEmpty()
    @IsStrongPassword(
      {
        minLength: 10,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      },
      {
        message:
          '비밀번호는 최소한 1개 이상의 숫자와 대문자, 특수문자가 모두 포함되고 10자리 이상이어야 합니다.',
      },
    )
    password: string

    @ApiProperty({ description: '닉네임' })
    @IsNotEmpty()
    @IsString()
    @MinLength(2, {
      message: '최소 2자리 이상의 닉네임이 필요합니다.',
    })
    username: string
  }
}

export namespace AuthResponseDto {
  export class Token {
    @ApiProperty({ description: '토큰' })
    @IsNotEmpty()
    @IsString()
    access_token: string

    constructor(access_token: string) {
      this.access_token = access_token
    }
  }
}
