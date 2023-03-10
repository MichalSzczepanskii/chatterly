import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from '@chatterly/api/users/data-access';
import { CreateUserDto } from '@chatterly/api/users/utils';
import { Public } from '@chatterly/api/shared/utils';
import { Admin } from '@chatterly/api/shared/utils';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Public()
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const { id } = await this.userService.createUser(user);
    return id;
  }

  @Admin()
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param() params) {
    return await this.userService.deleteUserById(params.id);
  }
}
