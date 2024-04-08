import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
  ForbiddenAuthenticationException,
  NotFoundTokenException,
  WrongTokenException,
} from 'src/commons/custom.error'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization || null
    if (!token) {
      throw new NotFoundTokenException()
    }
    try {
      const payload = await this.jwtService.verify(token)
      request.params.id = payload.id
      return true
    } catch {
      throw new WrongTokenException()
    }
  }
}
