import {
  ForbiddenException,
  InternalServerErrorException,
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

export class NotFoundTokenException extends UnauthorizedException {
  constructor(
    message: string = '인증 토큰이 없습니다.',
    public error_code: number = 1004,
  ) {
    super(message)
    this.name = 'NotFoundTokenException'
  }
}

export class ForbiddenAuthenticationException extends NotFoundException {
  constructor(
    message: string = '알 수 없는 사용자입니다.',
    public error_code: number = 1005,
  ) {
    super(message)
    this.name = 'ForbiddenAuthenticationException'
  }
}

export class WrongTokenException extends ForbiddenException {
  constructor(
    message: string = '잘 못 된 토큰입니다.',
    public error_code: number = 1006,
  ) {
    super(message)
    this.name = 'WrongTokenException'
  }
}

export class NotFoundUserException extends NotFoundException {
  constructor(
    message: string = '사용자를 찾을 수 없습니다.',
    public error_code: number = 1007,
  ) {
    super(message)
    this.name = 'NotFoundUserException'
  }
}

export class RemovedEmailException extends ForbiddenException {
  constructor(
    message: string = '탈퇴한 이메일입니다.',
    public error_code: number = 1008,
  ) {
    super(message)
    this.name = 'RemovedEmailException'
  }
}

export class NotFoundGroupException extends NotFoundException {
  constructor(
    message: string = '그룹을 찾을 수 없습니다.',
    public error_code: number = 1009,
  ) {
    super(message)
    this.name = 'NotFoundGroupException'
  }
}

export class NotFoundFolderException extends NotFoundException {
  constructor(
    message: string = '폴더를 찾을 수 없습니다.',
    public error_code: number = 1010,
  ) {
    super(message)
    this.name = 'NotFoundFolderException'
  }
}

export class NoFileException extends InternalServerErrorException {
  constructor(
    message: string = '업로드할 파일이 없습니다.',
    public error_code: number = 1011,
  ) {
    super(message)
    this.name = 'NoFileException'
  }
}

export class InvalidFileExtensionException extends ForbiddenException {
  constructor(
    message: string = '허용되지 않는 확장자가 존재합니다.',
    public error_code: number = 1012,
  ) {
    super(message)
    this.name = 'InvalidFileExtensionException'
  }
}

export class TooManyFileException extends ForbiddenException {
  constructor(
    message: string = '파일은 최대 5개까지 업로드 가능합니다.',
    public error_code: number = 1013,
  ) {
    super(message)
    this.name = 'TooManyFileException'
  }
}

export class TooLargeFileSizeException extends ForbiddenException {
  constructor(
    filename: string,
    message: string = '파일의 용량이 너무 큽니다.',
    public error_code: number = 1014,
  ) {
    super(`${message} (${filename})`)
    this.name = 'TooManyFileException'
  }
}

export class UnknownFileUploadException extends InternalServerErrorException {
  constructor(
    message: string = '파일 업로드 중 알 수 없는 에러가 발생하였습니다.',
    public error_code: number = 1015,
  ) {
    super(message)
    this.name = 'UnknownFileException'
  }
}
