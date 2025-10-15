import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getToken } from '../utils/token-utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    
    if (!authHeader) {
      throw new ForbiddenException("Sesión no autorizada");
    }

    this.validateToken(authHeader);
    return true;
  }

  private validateToken(token: string): void {
    try {
      this.jwtService.verify(getToken(token));
    } catch (error) {
      throw new ForbiddenException("Sesión expirada");
    }
  }
}

