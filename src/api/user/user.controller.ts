import {
  Controller,
  Body,
  Get,
  UseGuards,
  Param,
  Patch,
  Delete,
  UseInterceptors,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserRequestDto, UserResponseDto } from './user.dto'
import { AuthGuard } from 'src/api/auth/auth.guard'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { NotFoundUserException } from 'src/commons/custom.error'
import { SuccessResponse } from 'src/commons/common.response'
import {
  TransactionInterceptor,
  TransactionManager,
} from 'src/middleware/transaction.intercepter'
import { EntityManager } from 'typeorm'

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: UserResponseDto.User,
  })
  @UseInterceptors(TransactionInterceptor)
  async getUser(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id') id: number,
  ): Promise<UserResponseDto.User> {
    const user = await this.usersService.getUserById(queryRunner, id)
    return new UserResponseDto.User(
      user.id,
      user.email,
      user.username,
      user.created_at,
    )
  }

  @Patch('')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @UseInterceptors(TransactionInterceptor)
  async modifyUser(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id') id: number,
    @Body() data: UserRequestDto.PatchUserDto,
  ): Promise<SuccessResponse> {
    const user = await this.usersService.getUserById(queryRunner, id)
    if (!user) {
      throw new NotFoundUserException()
    }
    await this.usersService.modifyUser(queryRunner, id, data)
    return new SuccessResponse(true)
  }

  @Delete('')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SuccessResponse })
  @UseInterceptors(TransactionInterceptor)
  async deleteUser(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id') id: number,
  ): Promise<SuccessResponse> {
    const user = await this.usersService.getUserById(queryRunner, id)
    if (!user) {
      throw new NotFoundUserException()
    }
    await this.usersService.deleteUser(queryRunner, id)
    return new SuccessResponse(true)
  }
}
