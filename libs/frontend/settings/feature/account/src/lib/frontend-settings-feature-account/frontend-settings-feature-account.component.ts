import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { InputAvatarComponent } from '@chatterly/frontend/settings/ui/input-avatar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AuthState,
  FrontendSharedDataAccessModule,
  selectUser,
} from '@chatterly/frontend/shared/data-access';
import { Store } from '@ngrx/store';
import { AccountSettings, User } from '@chatterly/shared/data-access';
import { AccountSettingsService } from '@chatterly/frontend/settings/data-access';
import { AlertService } from '@chatterly/frontend/shared/services/alert';

@Component({
  selector: 'chatterly-frontend-settings-feature-account',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    InputAvatarComponent,
    ReactiveFormsModule,
    FrontendSharedDataAccessModule,
  ],
  templateUrl: './frontend-settings-feature-account.component.html',
  styleUrls: ['./frontend-settings-feature-account.component.scss'],
})
export class FrontendSettingsFeatureAccountComponent implements OnInit {
  form!: FormGroup;
  user?: User;

  constructor(
    private formBuilder: FormBuilder,
    private authStore: Store<AuthState>,
    private asService: AccountSettingsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.authStore.select(selectUser).subscribe(user => {
      if (!user) return;
      this.user = user;
      this.form = this.formBuilder.group({
        name: [this.user.name],
        profilePicture: [],
      });
    });
  }

  submitForm() {
    console.log(this.form.dirty);
    console.log(this.form.value);
    if (!this.form.dirty) return;
    this.asService.updateSettings(this.getDirtyControlsValue()).subscribe({
      next: () => {
        this.alertService.showSuccess({
          message: 'settings.account.success',
        });
      },
    });
  }

  private getDirtyControlsValue(): AccountSettings {
    const controlsKeys = Object.keys(this.form.controls);
    const output: AccountSettings = {};
    for (const controlKey of controlsKeys) {
      const currentControl = this.form.controls[controlKey];
      if (currentControl.dirty)
        output[controlKey as keyof AccountSettings] = currentControl.value;
    }
    return output;
  }
}
