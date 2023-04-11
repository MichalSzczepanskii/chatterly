import { Injectable } from '@nestjs/common';
import { UserService } from '@chatterly/api/users/data-access';
import { AccountSettingsDto } from './dto/account-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private userService: UserService) {}

  async updateAccountSettings(
    userId: number,
    accountSettings: AccountSettingsDto & { profileImage?: string }
  ) {
    return await this.userService.updateUser(userId, accountSettings);
  }
}
