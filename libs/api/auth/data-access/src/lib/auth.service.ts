import { Injectable } from '@nestjs/common';
import { UserService } from '@chatterly/api/users/data-access';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }

  async validateUser(data: {email: string, password: string}): Promise<any> {
    const user = await this.userService.findOneByEmail(data.email);
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if(user && isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
