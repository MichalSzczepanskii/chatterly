import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '@chatterly/api/users/data-access';
import { CreateUserDto } from '@chatterly/api/users/utils';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }
}
