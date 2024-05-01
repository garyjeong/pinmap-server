import { Injectable } from '@nestjs/common'
import { AuthRequestDto } from 'src/api/auth/auth.dto'
import { User } from 'src/entities/user.entity'
import { EntityManager } from 'typeorm'

@Injectable()
export class UserService {
  constructor() {}

  async existedEmail(
    queryRunner: EntityManager,
    email: string,
  ): Promise<boolean> {
    return await queryRunner.exists(User, {
      where: { email: email },
    })
  }

  async isRemovedEmail(
    queryRunner: EntityManager,
    email: string,
  ): Promise<boolean> {
    return (
      (await queryRunner
        .createQueryBuilder('user', 'user')
        .where('user.email = :email', { email })
        .withDeleted()
        .getCount()) > 0
    )
  }

  async getUserById(
    queryRunner: EntityManager,
    id: number,
  ): Promise<User> {
    return await queryRunner.findOne(User, { where: { id: id } })
  }

  async getUserByEmail(
    queryRunner: EntityManager,
    email: string,
  ): Promise<User> {
    return await queryRunner.findOne(User, {
      where: { email: email },
    })
  }

  async createUser(
    queryRunner: EntityManager,
    data: AuthRequestDto.SignUp,
  ): Promise<User> {
    const user = await queryRunner.create(User, { ...data })
    return await queryRunner.save(user)
  }

  async modifyUser(
    queryRunner: EntityManager,
    id: number,
    data: Partial<User>,
  ): Promise<void> {
    await queryRunner.update(User, id, data)
  }

  async deleteUser(
    queryRunner: EntityManager,
    id: number,
  ): Promise<void> {
    await queryRunner.softDelete(User, id)
  }
}
