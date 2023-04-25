import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@chatterly/shared/data-access';
import { FrontendSettingsUiFileImageModule } from '@chatterly/frontend/settings/ui/file-image';
import { UserService } from '@chatterly/frontend/shared/data-access';

@Component({
  selector: 'chatterly-user-avatar',
  standalone: true,
  imports: [CommonModule, FrontendSettingsUiFileImageModule],
  template: `
    <img
      *ngIf="
        profileImageFile && (profileImageFile | fileImage | async) as imageFile;
        else generatedAvatar
      "
      class="profile-image"
      [src]="imageFile"
      [alt]="_user.name" />
    <ng-template #generatedAvatar>
      <div
        role="img"
        class="profile-image initials"
        [style]="{
          backgroundColor: backgroundColor
        }">
        {{ initials }}
      </div>
    </ng-template>
  `,
  styleUrls: ['./frontend-shared-ui-user-avatar.component.scss'],
})
export class FrontendSharedUiUserAvatarComponent {
  @Input() set user(value: User) {
    this._user = value;
    this.gatherDataForCustomAvatar();
    this.setProfileImageFile();
  }

  public _user!: User;
  public profileImageFile?: File;
  public initials!: string;
  public backgroundColor!: string;
  private readonly backgroundColors = [
    '#1E90FF',
    '#000080',
    '#006400',
    '#8B0000',
    '#4B0082',
    '#A9A9A9',
    '#B22222',
    '#228B22',
    '#FF8C00',
    '#00BFFF',
  ];
  constructor(private userService: UserService) {}

  private gatherDataForCustomAvatar() {
    this.initials = this._user.name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
    this.backgroundColor =
      this.backgroundColors[this._user.id % this.backgroundColors.length];
  }

  private setProfileImageFile() {
    if (this._user.profileImage) {
      this.userService
        .getProfileImage(this._user.profileImage)
        .subscribe(file => (this.profileImageFile = file as File));
    }
  }
}
