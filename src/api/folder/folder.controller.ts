import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FolderService } from './folder.service'
import { AuthGuard } from '../auth/auth.guard'
import {
  TransactionInterceptor,
  TransactionManager,
} from 'src/middleware/transaction.interceptor'
import { EntityManager } from 'typeorm'
import { FolderRequestDto, FolderResponseDto } from './folder.dto'
import { Folder } from 'src/entities/folder.entity'
import { GroupService } from '../group/group.service'
import { SuccessResponse } from 'src/commons/common.response'
import { NotFoundFolderException } from 'src/commons/custom.error'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Folders')
@Controller('folders')
export class FolderController {
  constructor(
    private groupService: GroupService,
    private folderService: FolderService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async getAllFolders(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('cnt', ParseIntPipe) count: number,
  ): Promise<FolderResponseDto.Folders> {
    const groupIds: number[] = await this.groupService.getGroupIds(
      queryRunner,
      userId,
    )
    const folders: FolderResponseDto.Folder[] =
      await this.folderService
        .getAllFolders(queryRunner, groupIds, page, count)
        .then((folders) => {
          return folders.map((folder) => {
            return new FolderResponseDto.Folder(
              folder.id,
              folder.name,
              folder.description,
              folder.group_id,
              folder.created_at,
              folder.updated_at,
            )
          })
        })
    return new FolderResponseDto.Folders(folders)
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async getGroupFolders(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id', ParseIntPipe) userId: number,
    @Query('g', ParseIntPipe) groupId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('cnt', ParseIntPipe) count: number,
  ): Promise<FolderResponseDto.Folders> {
    const folders = await this.folderService
      .getGroupFolders(queryRunner, groupId, page, count)
      .then((folders) => {
        return folders.map((folder) => {
          return new FolderResponseDto.Folder(
            folder.id,
            folder.name,
            folder.description,
            folder.group_id,
            folder.created_at,
            folder.updated_at,
          )
        })
      })
    return new FolderResponseDto.Folders(folders)
  }

  @Get('/trash')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  // TODO: Folder에 소속된 Photo들도 모두 삭제 로직 추가
  async getDeletedFolders(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('cnt', ParseIntPipe) count: number,
  ): Promise<FolderResponseDto.Folders> {
    const groupIds = await this.groupService.getGroupIds(
      queryRunner,
      userId,
    )
    const folders = await this.folderService
      .getDeletedFolders(queryRunner, groupIds, page, count)
      .then((folders) => {
        return folders.map((folder) => {
          return new FolderResponseDto.Folder(
            folder.id,
            folder.name,
            folder.description,
            folder.group_id,
            folder.created_at,
            folder.updated_at,
          )
        })
      })
    return new FolderResponseDto.Folders(folders)
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async createFolder(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id', ParseIntPipe) userId: number,
    @Query('g', ParseIntPipe) groupId: number,
    @Body() data: FolderRequestDto.Folder,
  ): Promise<FolderResponseDto.Folder> {
    await this.groupService.getGroup(queryRunner, userId, groupId)

    const folder: Folder = await this.folderService.createFolder(
      queryRunner,
      groupId,
      data.name,
      data.description,
    )
    return new FolderResponseDto.Folder(
      folder.id,
      folder.name,
      folder.description,
      folder.group_id,
      folder.created_at,
      folder.updated_at,
    )
  }

  @Patch()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async updateFolder(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id', ParseIntPipe) userId: number,
    @Query('f') folderId: string,
    @Body() data: FolderRequestDto.Folder,
  ): Promise<SuccessResponse> {
    const folder: Folder = await this.folderService.getFolder(
      queryRunner,
      folderId,
    )

    if (!folder) {
      throw new NotFoundFolderException()
    }
    await this.folderService.updateFolder(queryRunner, folderId, data)
    return new SuccessResponse(true)
  }

  @Delete()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  async deleteFolder(
    @TransactionManager() queryRunner: EntityManager,
    @Param('id', ParseIntPipe) userId: number,
    @Query('f') folderId: string,
  ): Promise<SuccessResponse> {
    const folder: Folder = await this.folderService.getFolder(
      queryRunner,
      folderId,
    )

    if (!folder) {
      throw new NotFoundFolderException()
    }
    await this.folderService.deleteFolder(queryRunner, folderId)
    return new SuccessResponse(true)
  }
}
