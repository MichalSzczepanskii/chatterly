import { Module } from '@nestjs/common';
import { ApiUsersDataAccessModule } from '@chatterly/api/users/data-access';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@chatterly/api/auth/utils';

@Module({
  imports: [ApiUsersDataAccessModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn},
  })],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApiAuthDataAccessModule {}
