import { Injectable } from '@nestjs/common';
import { User, UserService } from '@chatterly/api/users/data-access';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {
  }

  async validateUser(data: {email: string, password: string}): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOneByEmail(data.email);
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if(user && isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) }
  }
}