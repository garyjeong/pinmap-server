import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common'
import { GroupService } from './group.service'
import { AuthGuard } from '../auth/auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { GroupRequestDto, GroupResponseDto } from './group.dto'
import { TransactionInterceptor } from 'src/middleware/transaction.intercepter'
import { EntityManager } from 'typeorm'
import { UserGroup } from 'src/entities/user-group.entity'

@ApiTags('Groups')
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getGroups(
    @Param('id') id: number,
    // ): Promise<GroupResponseDto.Groups> {
  ): Promise<any> {
    const groups = await this.groupService.getGroups(id)
    return null
  }

  // @Post('')
  // @UseGuards(AuthGuard)
  // async createGroups(
  //   @Param('id') id: number,
  //   @Body() data: GroupRequestDto.Group,
  // ): Promise<GroupResponseDto.Group> {
  //   const group = await this.groupService.createGroup(id, data.name)
  //   return new GroupResponseDto.Group(
  //     group.id,
  //     group.name,
  //     group.created_at,
  //   )
  // }
}
