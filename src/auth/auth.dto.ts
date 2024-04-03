import { IsEmail, IsString, Length } from 'class-validator'

export namespace AuthRequestDto {
  export class Signin {
    @IsEmail()
    email: string

    @IsString()
    @Length(10)
    password: string
  }

  export class Signup {
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
