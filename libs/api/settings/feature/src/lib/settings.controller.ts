import {
  Body,
  Controller,
  Patch,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { profileImageStorage } from './profile-image-storage';
import { profileImageValidators } from './profile-image-validators';
import {
  AccountSettingsDto,
  SettingsService,
} from '@chatterly/api/settings/data-access';
import { OptionalFileInterceptor } from './optional-file.interceptor';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Patch('account')
  @UseInterceptors(
    new OptionalFileInterceptor('profilePicture', profileImageStorage)
  )
  async updateAccountSettings(
    @Body() accountSettings: AccountSettingsDto,
    @Request() req,
    @UploadedFile(profileImageValidators) imageFile?: Express.Multer.File
  ) {
    const user = req.user;
    return await this.settingsService.updateAccountSettings(user.userId, {
      ...accountSettings,
      profileImage: imageFile?.filename,
    });
  }
}
