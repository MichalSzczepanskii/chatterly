import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard, Public } from '@chatterly/api/auth/utils';
import { AuthService } from '@chatterly/api/auth/data-access';
import { AuthLoginResponse } from '@chatterly/shared/data-access';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AuthLoginResponse> {
    return await this.authService.login(req.user);
  }
}
