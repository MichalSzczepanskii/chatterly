import { Module } from '@nestjs/common';
import { ApiUsersDataAccessModule } from '@chatterly/api/users/data-access';
import { AuthService } from './auth.service';

@Module({
  imports: [ApiUsersDataAccessModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApiAuthDataAccessModule {}
