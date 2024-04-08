import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty } from 'class-validator'

export class SuccessResponse {
  @ApiProperty({ description: '성공여부' })
  @IsNotEmpty()
  @IsBoolean()
  success: boolean

  constructor(success: boolean) {
    this.success = success
  }
}
