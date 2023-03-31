import {
  Body,
  Controller,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '@chatterly/api/shared/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { profileImageStorage } from './profile-image-storage';
import { profileImageValidators } from './profile-image-validators';
import { AccountSettingsDto } from '@chatterly/api/settings/data-access';

@Controller('settings')
export class SettingsController {
  @Public()
  @Patch('account')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: profileImageStorage,
    })
  )
  updateAccountSettings(
    @UploadedFile(profileImageValidators) imageFile: Express.Multer.File,
    @Body() accountSettings: AccountSettingsDto
  ) {
    return { imageFile };
  }
}
