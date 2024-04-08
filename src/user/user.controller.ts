import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserResponseDto } from './user.dto'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getUser(@Param() id: string): Promise<UserResponseDto.User> {
    return await this.usersService.getUserById(id)
  }
}
