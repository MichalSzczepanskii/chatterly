import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { ApiUsersDataAccessModule } from '@chatterly/api/users/data-access';

@Module({
  imports: [ApiUsersDataAccessModule],
  controllers: [],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class ApiSettingsDataAccessModule {}
