import { Module } from '@nestjs/common';
import { ApiUsersDataAccessModule } from '@chatterly/api/users/data-access';
import { UserController } from './user.controller';

@Module({
  imports: [ApiUsersDataAccessModule],
  controllers: [UserController],
  exports: [],
})
export class ApiUsersFeatureModule {}
