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
  Patch,
  Delete,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserRequestDto, UserResponseDto } from './user.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger'
import { NotFoundUserException } from 'src/commons/custom.error'
import { SuccessResponse } from 'src/commons/common.response'

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: UserResponseDto.User,
  })
  @Get('')
  async getUser(
    @Param('id') id: string,
  ): Promise<UserResponseDto.User> {
    const user = await this.usersService.getUserById(id)
    return new UserResponseDto.User(
      user.id,
      user.email,
      user.username,
      user.created_at,
    )
  }

  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @Patch('')
  async modifyUser(
    @Param('id') id: string,
    @Body() data: UserRequestDto.PatchUserDto,
  ): Promise<SuccessResponse> {
    const user = await this.usersService.getUserById(id)
    if (!user) {
      throw new NotFoundUserException()
    }
    await this.usersService.modifyUser(id, data)
    return new SuccessResponse(true)
  }

  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @Delete('')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<SuccessResponse> {
    const user = await this.usersService.getUserById(id)
    if (!user) {
      throw new NotFoundUserException()
    }
    await this.usersService.deleteUser(id)
    return new SuccessResponse(true)
  }
}
