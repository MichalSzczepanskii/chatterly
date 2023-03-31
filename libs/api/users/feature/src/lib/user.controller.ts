import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UserService } from '@chatterly/api/users/data-access';
import { Admin, Public } from '@chatterly/api/shared/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { profileImageStorage } from './profile-image-storage';
import { profileImageValidators } from './profile-image-validators';

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
  @Post('/upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: profileImageStorage,
    })
  )
  uploadProfilePicture(
    @UploadedFile(profileImageValidators) imageFile: Express.Multer.File
  ) {
    return { imageFile };
  }
}
