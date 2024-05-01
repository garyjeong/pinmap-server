import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
  DuplicationEmailException,
  NotMatchedPasswordException,
  RemovedEmailException,
  UserNotFoundException,
} from 'src/commons/custom.error'
import {
  compareSyncPassword,
  setHashedPassword,
} from 'src/utils/crypto.util'
import { UserService } from 'src/api/user/user.service'
import { AuthRequestDto, AuthResponseDto } from './auth.dto'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import {
  TransactionInterceptor,
  TransactionManager,
} from 'src/middleware/transaction.intercepter'
import { EntityManager } from 'typeorm'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post('sign/in')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  async SignIn(
    @TransactionManager() queryRunner: EntityManager,
    @Body() data: AuthRequestDto.SignIn,
  ): Promise<AuthResponseDto.Token> {
    const user = await this.usersService.getUserByEmail(
      queryRunner,
      data.email,
    )
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

  @Post('sign/up')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  async SignUp(
    @TransactionManager() queryRunner: EntityManager,
    @Body() data: AuthRequestDto.SignUp,
  ): Promise<AuthResponseDto.Token> {
    if (
      await this.usersService.existedEmail(queryRunner, data.email)
    ) {
      throw new DuplicationEmailException()
    }

    if (
      await this.usersService.isRemovedEmail(queryRunner, data.email)
    ) {
      throw new RemovedEmailException()
    }

    data.password = await setHashedPassword(
      data.password,
      parseInt(this.configService.get('HASH_SALT')),
    )
    const user = await this.usersService.createUser(queryRunner, data)
    const token = await this.jwtService.sign({ id: user.id })
    return new AuthResponseDto.Token(token)
  }
}
