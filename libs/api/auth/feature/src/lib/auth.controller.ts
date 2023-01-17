import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard, Public } from '@chatterly/api/auth/utils';
import { AuthService } from '@chatterly/api/auth/data-access';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
