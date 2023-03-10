import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY } from '@chatterly/api/shared/utils';

@Injectable()
export class SuperGuard implements CanActivate {
  constructor(private readonly jwtAuthGuard: JwtAuthGuard,
              private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext){
    const req = context.switchToHttp().getRequest();
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if(isAdmin) {
      return process.env.NX_ADMIN_ENABLE === 'true' && req.body['password'] === process.env.NX_ADMIN
    } else {
      return this.jwtAuthGuard.canActivate(context);
    }
  }
}
