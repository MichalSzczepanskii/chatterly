import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUserSearch from './+state/user-search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserSearchEffects } from './+state/user-search.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromUserSearch.userSearchFeatureKey,
      fromUserSearch.reducer
    ),
    EffectsModule.forFeature([UserSearchEffects]),
  ],
})
export class FrontendHomeDataAccessModule {}
