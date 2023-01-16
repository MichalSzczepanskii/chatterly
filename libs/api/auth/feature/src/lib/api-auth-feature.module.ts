import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ApiAuthDataAccessModule } from '@chatterly/api/auth/data-access';
import { LocalStrategy } from '@chatterly/api/auth/utils';

@Module({
  imports: [ApiAuthDataAccessModule],
  controllers: [AuthController],
  providers: [LocalStrategy],
  exports: [],
})
export class ApiAuthFeatureModule {}
