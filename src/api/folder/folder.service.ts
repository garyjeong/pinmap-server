import { Injectable } from '@nestjs/common'
import { NotFoundUserException } from 'src/commons/custom.error'
import { Folder } from 'src/entities/folder.entity'
import { UserGroup } from 'src/entities/user-group.entity'
import { User } from 'src/entities/user.entity'
import { EntityManager, FindManyOptions, In, Not } from 'typeorm'

@Injectable()
export class FolderService {
  constructor() {}

  async getAllFolders(
    queryRunner: EntityManager,
    groupIds: number[],
    page: number = 1,
    count: number = 10,
  ): Promise<Folder[]> {
    const folders: Folder[] = await queryRunner.find(Folder, {
      where: {
        group_id: In(groupIds),
      },
      skip: (page - 1) * count,
      take: count,
    })
    return folders
  }

  async getGroupFolders(
    queryRunner: EntityManager,
    groupId: number,
    page: number = 1,
    perPage: number = 10,
  ): Promise<Folder[]> {
    const folders: Folder[] = await queryRunner.find(Folder, {
      where: {
        group_id: groupId,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    })
    return folders
  }

  async getFolder(
    queryRunner: EntityManager,
    folderId: string,
  ): Promise<Folder> {
    return await queryRunner.findOne(Folder, {
      where: {
        id: folderId,
      },
    })
  }

  async getDeletedFolders(
    queryRunner: EntityManager,
    groupIds: number[],
    page: number = 1,
    perPage: number = 10,
  ): Promise<Folder[]> {
    const options: FindManyOptions<Folder> = {
      where: {
        group_id: In(groupIds),
        deleted_at: Not(null),
      },
      skip: (page - 1) * perPage,
      take: perPage,
    }
    const folders: Folder[] = await queryRunner.find(Folder, options)
    return folders
  }

  async createFolder(
    queryRunner: EntityManager,
    groupId: number,
    name: string,
    description?: string,
  ): Promise<Folder> {
    const folder: Folder = await queryRunner.save(Folder, {
      name: name,
      description: description,
      group_id: groupId,
    })
    return folder
  }

  async updateFolder(
    queryRunner: EntityManager,
    folderId: string,
    data: Partial<Folder>,
  ): Promise<void> {
    await queryRunner.update(Folder, folderId, data)
  }

  async deleteFolder(
    queryRunner: EntityManager,
    folderId: string,
  ): Promise<void> {
    await queryRunner.softDelete(Folder, folderId)
  }
}
