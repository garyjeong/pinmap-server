import { ApiProperty } from '@nestjs/swagger'
import { OmitType } from '@nestjs/mapped-types'

class User {
  id: number
  email: string
  password: string
  username: string
}

export class InsertUserDto extends OmitType(User, ['id' as const]) {}
