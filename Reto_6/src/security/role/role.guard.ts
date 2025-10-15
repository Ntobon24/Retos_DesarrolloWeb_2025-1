import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getToken } from '../utils/token-utils';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    
    if (!authorization) {
      throw new ForbiddenException("Sesión no autorizada");
    }

    const payload = this.extractAndVerifyToken(authorization);
    this.validateUserAccess(request, payload);
    
    return true;
  }

  private extractAndVerifyToken(authHeader: string): any {
    try {
      return this.jwtService.verify(getToken(authHeader));
    } catch (error) {
      console.log(error);
      throw new ForbiddenException("Sesión expirada");
    }
  }

  private validateUserAccess(request: any, payload: any): void {
    const userId = request.body['userId'];
    if (userId && userId !== payload['id']) {
      throw new ForbiddenException("Accion no permitida");
    }
  }
}
