import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  AuthState,
  logout,
  selectAllNavItems,
  selectUser,
  UiState,
} from '@chatterly/frontend/shared/data-access';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FrontendTooltipModule } from '@chatterly/frontend/shared/ui/tooltip';
import { FrontendSettingsUiFileImageModule } from '@chatterly/frontend/settings/ui/file-image';
import { FrontendSharedUiUserAvatarComponent } from '@chatterly/frontend/shared/ui/user-avatar';

@Component({
  selector: 'chatterly-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FrontendTooltipModule,
    FrontendSettingsUiFileImageModule,
    FrontendSharedUiUserAvatarComponent,
  ],
  templateUrl: './frontend-sidebar.component.html',
  styleUrls: ['./frontend-sidebar.component.scss'],
})
export class FrontendSidebarComponent {
  readonly navItems$ = this.uiStore.select(selectAllNavItems);
  readonly user$ = this.authStore.select(selectUser);
  constructor(
    private uiStore: Store<UiState>,
    private authStore: Store<AuthState>
  ) {}

  logout() {
    this.authStore.dispatch(logout());
  }
}
