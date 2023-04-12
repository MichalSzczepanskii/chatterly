import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@chatterly/api/auth/utils';
import { AuthService } from '@chatterly/api/auth/data-access';
import { AuthLoginResponse } from '@chatterly/shared/data-access';
import { Public } from '@chatterly/api/shared/utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AuthLoginResponse> {
    return await this.authService.login(req.user);
  }

  @Get('me')
  async me(@Request() req) {
    const { password, ...user } = await this.authService.getLoggedUser(
      req.user.userId
    );
    return user;
  }
}
