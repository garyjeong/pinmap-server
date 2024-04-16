import { Injectable, UseInterceptors } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserGroupStatus } from 'src/commons/common.constants'
import { NotFoundUserException } from 'src/commons/custom.error'
import { Group } from 'src/entities/group.entity'
import { UserGroup } from 'src/entities/user-group.entity'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(UserGroup)
    private usergroupRepository: Repository<UserGroup>,
  ) {}

  async getGroups(id: number): Promise<Group[]> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['user_groups', 'user_groups.group'],
    })
    if (!user) {
      throw new NotFoundUserException()
    }
    return user.user_groups.map((user_group) => user_group.group)
  }

  async createGroup(userId: number, name: string): Promise<Group> {
    const group = await this.groupRepository.create({
      name: name,
    })
    await this.usergroupRepository.create({
      user_id: userId,
      group_id: group.id,
      status_id: UserGroupStatus.INVITED,
      // is_owner: true,
    })
    return group
  }
}
