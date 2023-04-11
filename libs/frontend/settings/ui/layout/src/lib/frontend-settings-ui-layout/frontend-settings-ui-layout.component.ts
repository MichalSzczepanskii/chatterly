import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FrontendSettingsDataAccessModule,
  selectAllSettingsLinks,
  SettingsLinksState,
} from '@chatterly/frontend/settings/data-access';

@Component({
  selector: 'chatterly-frontend-settings-ui-layout',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    RouterOutlet,
    FrontendSettingsDataAccessModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './frontend-settings-ui-layout.component.html',
  styleUrls: ['./frontend-settings-ui-layout.component.scss'],
})
export class FrontendSettingsUiLayoutComponent {
  readonly $links = this.settingsLinksStore.select(selectAllSettingsLinks);
  constructor(private settingsLinksStore: Store<SettingsLinksState>) {}
}
