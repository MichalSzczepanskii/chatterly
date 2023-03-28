import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ApiAuthDataAccessModule } from '@chatterly/api/auth/data-access';
import {
  JwtAuthGuard,
  JwtStrategy,
  LocalStrategy,
  SuperGuard,
} from '@chatterly/api/auth/utils';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ApiAuthDataAccessModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: SuperGuard,
    },
  ],
  exports: [],
})
export class ApiAuthFeatureModule {}
