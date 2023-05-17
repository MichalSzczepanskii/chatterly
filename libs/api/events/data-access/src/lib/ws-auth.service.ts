import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@chatterly/api/auth/constants';
import { JwtPayload } from '@chatterly/shared/data-access';

@Injectable()
export class WsAuthService {
  constructor(private jwtService: JwtService) {}

  verify(token: string): JwtPayload | null {
    try {
      return this.jwtService.verify<JwtPayload>(token, {
        ignoreExpiration: false,
        secret: jwtConstants.secret,
      });
    } catch (e) {
      Logger.error(e);
      return;
    }
  }
}
