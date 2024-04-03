import {
  Controller,
  HttpStatus,
  UnauthorizedException,
  HttpCode,
  Post,
  Body,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
  DuplicationEmailException,
  NotMatchedPasswordException,
  UserNotFoundException,
} from 'src/commons/custom.error'
import { hashedPassword } from 'src/modules/crypto.module'
import { UserService } from 'src/user/user.service'
import { AuthRequestDto, AuthResponseDto } from './auth.dto'
import { createToken } from 'src/modules/jwt.module'

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign/in')
  async SignIn(
    email: string,
    password: string,
  ): Promise<AuthResponseDto.Token> {
    const user = await this.usersService.getUserByEmail(email)
    if (!user) {
      throw new UserNotFoundException()
    }
    if (
      !password ||
      (await hashedPassword(password)) != user.password
    ) {
      throw new NotMatchedPasswordException()
    }
    const payload = { id: user.id }
    const accessToken = this.jwtService.sign(payload)
    return { access_token: accessToken }
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign/up')
  async SignUp(
    @Body() data: AuthRequestDto.Signup,
  ): Promise<AuthResponseDto.Token> {
    const isDuplication = await this.usersService.existedEmail(
      data.email,
    )
    if (isDuplication) {
      throw new DuplicationEmailException()
    }
    const user = await this.usersService.createUser(data)
    return new AuthResponseDto.Token(await createToken(user.id))
  }
}
