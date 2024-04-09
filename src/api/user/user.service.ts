import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthRequestDto } from 'src/api/auth/auth.dto'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async existedEmail(email: string): Promise<boolean> {
    return await this.userRepository.exists({
      where: { email: email },
    })
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } })
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
    })
  }

  async createUser(data: AuthRequestDto.SignUp): Promise<User> {
    const user = await this.userRepository.create({
      ...data,
    })
    return await this.userRepository.save(user)
  }

  async modifyUser(id: string, data: Partial<User>): Promise<void> {
    await this.userRepository.update(id, data)
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.softDelete(id)
  }
}
