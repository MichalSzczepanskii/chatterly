import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { InputAvatarComponent } from '@chatterly/frontend/settings/ui/input-avatar';

@Component({
  selector: 'chatterly-frontend-settings-feature-account',
  standalone: true,
  imports: [CommonModule, TranslocoModule, InputAvatarComponent],
  templateUrl: './frontend-settings-feature-account.component.html',
  styleUrls: ['./frontend-settings-feature-account.component.scss'],
})
export class FrontendSettingsFeatureAccountComponent {}
