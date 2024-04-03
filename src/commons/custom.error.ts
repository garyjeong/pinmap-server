import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

export class UserNotFoundException extends NotFoundException {
  constructor(
    message: string = '가입된 Email을 찾을 수 없습니다.',
    public error_code: number = 1001,
  ) {
    super(message)
    this.name = 'UserNotFoundException'
  }
}
export class NotMatchedPasswordException extends UnauthorizedException {
  constructor(
    message: string = '비밀번호가 일치하지 않습니다.',
    public error_code: number = 1002,
  ) {
    super(message)
    this.name = 'NotMatchedPasswordException'
  }
}

export class DuplicationEmailException extends ForbiddenException {
  constructor(
    message: string = '중복된 이메일이 존재합니다.',
    public error_code: number = 1003,
  ) {
    super(message)
    this.name = 'DuplicationEmailException'
  }
}
