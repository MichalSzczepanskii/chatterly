import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '@chatterly/api/auth/constants';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('bearerToken'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
