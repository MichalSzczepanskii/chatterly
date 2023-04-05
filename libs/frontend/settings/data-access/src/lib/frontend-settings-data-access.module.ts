import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { settingsLinksReducer } from './+state/settings-links.reducer';
import { AccountSettingsService } from './account-settings.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('settingsLinks', settingsLinksReducer),
  ],
  providers: [AccountSettingsService],
})
export class FrontendSettingsDataAccessModule {}
