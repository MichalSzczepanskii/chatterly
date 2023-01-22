import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ApiAuthDataAccessModule } from '@chatterly/api/auth/data-access';
import { JwtAuthGuard, JwtStrategy, LocalStrategy } from '@chatterly/api/auth/utils';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ApiAuthDataAccessModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class ApiAuthFeatureModule {}
