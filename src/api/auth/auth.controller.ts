import {
  Controller,
  HttpStatus,
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
import {
  compareSyncPassword,
  setHashedPassword,
} from 'src/modules/crypto.module'
import { UserService } from 'src/api/user/user.service'
import { AuthRequestDto, AuthResponseDto } from './auth.dto'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectPinoLogger(AuthController.name)
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AuthController.name)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign/in')
  async SignIn(
    @Body() data: AuthRequestDto.SignIn,
  ): Promise<AuthResponseDto.Token> {
    const user = await this.usersService.getUserByEmail(data.email)
    if (!user) {
      throw new UserNotFoundException()
    }

    if (
      !data.password ||
      !(await compareSyncPassword(user.password, data.password))
    ) {
      throw new NotMatchedPasswordException()
    }

    const token = await this.jwtService.sign({ id: user.id })
    return new AuthResponseDto.Token(token)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign/up')
  async SignUp(
    @Body() data: AuthRequestDto.SignUp,
  ): Promise<AuthResponseDto.Token> {
    const isDuplication = await this.usersService.existedEmail(
      data.email,
    )
    if (isDuplication) {
      throw new DuplicationEmailException()
    }

    data.password = await setHashedPassword(
      data.password,
      parseInt(this.configService.get('HASH_SALT')),
    )
    const user = await this.usersService.createUser(data)
    const token = await this.jwtService.sign({ id: user.id })
    return new AuthResponseDto.Token(token)
  }
}
