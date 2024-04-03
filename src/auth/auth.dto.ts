import { IsEmail, IsString, Length } from 'class-validator'

export namespace AuthRequestDto {
  export class SignIn {
    @IsEmail()
    email: string

    @IsString()
    @Length(10)
    password: string
  }

  export class SignUp {
    @IsEmail()
    email: string

    @IsString()
    @Length(10)
    password: string

    @IsString()
    username: string
  }
}

export namespace AuthResponseDto {
  export class Token {
    @IsString()
    access_token: string

    constructor(access_token: string) {
      this.access_token = access_token
    }
  }
}
