import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { settingsLinksReducer } from './+state/settings-links.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('settingsLinks', settingsLinksReducer),
  ],
})
export class FrontendSettingsDataAccessModule {}
