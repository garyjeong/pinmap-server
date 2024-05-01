import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  Patch,
  Delete,
} from '@nestjs/common'
import { GroupService } from './group.service'
import { AuthGuard } from '../auth/auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { GroupRequestDto, GroupResponseDto } from './group.dto'
import {
  TransactionInterceptor,
  TransactionManager,
} from 'src/middleware/transaction.intercepter'
import { EntityManager } from 'typeorm'
import { SuccessResponse } from 'src/commons/common.response'
import { NotFoundGroupException } from 'src/commons/custom.error'

@ApiTags('Groups')
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async getGroups(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id') id: number,
  ): Promise<GroupResponseDto.Groups> {
    const groups = await this.groupService.getGroups(queryRunner, id)
    const _groups = await groups.map(
      (group) =>
        new GroupResponseDto.Group(
          group.id,
          group.name,
          group.created_at,
          group.updated_at,
        ),
    )
    return new GroupResponseDto.Groups(_groups)
  }

  @Get(':groupId')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async getGroup(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id') id: number,
    @Param('groupId') groupId: number,
  ): Promise<GroupResponseDto.Group> {
    const group = await this.groupService.getGroup(
      queryRunner,
      id,
      groupId,
    )
    return new GroupResponseDto.Group(
      group.id,
      group.name,
      group.created_at,
      group.updated_at,
    )
  }

  @Post('')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async createGroup(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id') id: number,
    @Body() data: GroupRequestDto.GroupDto,
  ): Promise<GroupResponseDto.Group> {
    const group = await this.groupService.createGroup(
      queryRunner,
      id,
      data.name,
    )
    return new GroupResponseDto.Group(
      group.id,
      group.name,
      group.created_at,
      group.updated_at,
    )
  }

  @Patch(':groupId')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async modifyGroup(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id') id: number,
    @Param('groupId') groupId: number,
    @Body() data: GroupRequestDto.GroupDto,
  ): Promise<SuccessResponse> {
    const group = await this.groupService.getGroup(
      queryRunner,
      id,
      groupId,
    )
    if (!group) {
      throw new NotFoundGroupException()
    }
    await this.groupService.modifyGroup(queryRunner, groupId, data)
    return new SuccessResponse(true)
  }

  @Delete(':groupId')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async deleteGroup(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id') id: number,
    @Param('groupId') groupId: number,
  ): Promise<SuccessResponse> {
    const group = await this.groupService.getGroup(
      queryRunner,
      id,
      groupId,
    )
    if (!group) {
      throw new NotFoundGroupException()
    }
    await this.groupService.deleteGroup(queryRunner, groupId)
    return new SuccessResponse(true)
  }
}
