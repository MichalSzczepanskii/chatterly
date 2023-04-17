import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@chatterly/shared/data-access';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { FrontendSettingsUiFileImageModule } from '@chatterly/frontend/settings/ui/file-image';

@Component({
  selector: 'chatterly-user-avatar',
  standalone: true,
  imports: [CommonModule, FrontendSettingsUiFileImageModule],
  template: `
    <img
      class="profile-image"
      [src]="
        _user.profileImageFile
          ? (_user.profileImageFile | fileImage | async)
          : randomAvatar
      " />
  `,
  styleUrls: ['./frontend-shared-ui-user-avatar.component.scss'],
})
export class FrontendSharedUiUserAvatarComponent {
  @Input() set user(value: User & { profileImageFile?: File }) {
    this._user = value;
    if (value.profileImageFile) return;
    this.randomAvatar = createAvatar(initials, {
      seed: value.name,
      backgroundColor: [
        'FF7F50',
        '8B008B',
        '228B22',
        'FFD700',
        '9932CC',
        'FF6347',
        '20B2AA',
        '8B0000',
        '00CED1',
        'FFC0CB',
      ],
    }).toDataUriSync();
  }
  public _user!: User & { profileImageFile?: File };
  public randomAvatar?: string;
}
