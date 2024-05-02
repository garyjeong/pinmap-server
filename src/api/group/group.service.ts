import { Injectable, UseInterceptors } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserGroupStatus } from 'src/commons/common.constants'
import { NotFoundUserException } from 'src/commons/custom.error'
import { Group } from 'src/entities/group.entity'
import { UserGroup } from 'src/entities/user-group.entity'
import { User } from 'src/entities/user.entity'
import { EntityManager, Repository } from 'typeorm'

@Injectable()
export class GroupService {
  constructor() {}

  async getGroups(
    queryRunner: EntityManager,
    userId: number,
  ): Promise<Group[]> {
    const user = await queryRunner.findOne(User, {
      where: { id: userId },
      relations: ['user_groups', 'user_groups.group'],
    })
    if (!user) {
      throw new NotFoundUserException()
    }
    return user.user_groups.map((user_group) => user_group.group)
  }

  async getGroup(
    queryRunner: EntityManager,
    userId: number,
    groupId: number,
  ): Promise<Group> {
    const groups = await this.getGroups(queryRunner, userId)
    return groups.find((group) => group.id === groupId)
  }

  async createGroup(
    queryRunner: EntityManager,
    userId: number,
    name: string,
  ): Promise<Group> {
    const group = await queryRunner.save(Group, { name: name })
    await queryRunner.save(UserGroup, {
      user_id: userId,
      group_id: group.id,
      status_id: UserGroupStatus.JOINED,
      is_owner: true,
    })

    return group
  }

  async modifyGroup(
    queryRunner: EntityManager,
    groupId: number,
    data: Partial<Group>,
  ): Promise<void> {
    await queryRunner.update(Group, groupId, data)
  }

  async deleteGroup(
    queryRunner: EntityManager,
    groupId: number,
  ): Promise<void> {
    await queryRunner.update(
      UserGroup,
      { group_id: groupId },
      {
        deleted_at: new Date(),
      },
    )
    await queryRunner.softDelete(Group, groupId)
  }
}
