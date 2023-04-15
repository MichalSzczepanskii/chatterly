import { Injectable } from '@nestjs/common';
import { User, UserService } from '@chatterly/api/users/data-access';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginResponse } from '@chatterly/shared/data-access';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(data: {
    email: string;
    password: string;
  }): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOneWithPasswordByEmail(data.email);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordMatch) return null;
      delete user['password'];
      return user;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>): Promise<AuthLoginResponse> {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload), user: user };
  }

  async getLoggedUser(userId: number): Promise<User> {
    return this.userService.findOneById(userId);
  }
}
