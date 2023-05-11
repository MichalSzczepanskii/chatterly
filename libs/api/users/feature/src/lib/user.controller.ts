import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto, UserService } from '@chatterly/api/users/data-access';
import { Admin, Public } from '@chatterly/api/shared/utils';
import * as path from 'path';
import * as process from 'process';

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

  @Public()
  @Post('/email')
  async checkEmail(@Body('email') email: string) {
    const user = await this.userService.findOneByEmail(email);
    return !!user;
  }

  @Admin()
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param() params) {
    return await this.userService.deleteUserById(params.id);
  }

  @Public()
  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): File {
    return res.sendFile(
      path.join(process.cwd(), 'uploads/profile-images', imagename)
    );
  }

  @Get('search/name/:name')
  getUsersByPartialName(@Param('name') name: string) {
    return this.userService.getUsersByPartialName(name);
  }

  @Get(':id')
  async getUserInfo(@Param() params) {
    return await this.userService.getUserById(params.id);
  }
}
