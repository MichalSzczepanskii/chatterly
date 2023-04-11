import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { ApiSettingsDataAccessModule } from '@chatterly/api/settings/data-access';

@Module({
  imports: [ApiSettingsDataAccessModule],
  controllers: [SettingsController],
  providers: [],
  exports: [],
})
export class ApiSettingsFeatureModule {}
