import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { StoreModule } from '@ngrx/store';
import { authReducer, metaReducers } from './+state/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+state/auth/auth.effects';
import { uiReducer } from './+state/ui/ui.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer, { metaReducers: metaReducers }),
    StoreModule.forFeature('ui', uiReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthService],
})
export class FrontendSharedDataAccessModule {}
