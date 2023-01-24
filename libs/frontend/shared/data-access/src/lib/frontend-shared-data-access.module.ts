import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { StoreModule } from '@ngrx/store';
import { authReducer, metaReducers } from './+state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+state/auth.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer, { metaReducers: metaReducers }),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthService],
})
export class FrontendSharedDataAccessModule {}
