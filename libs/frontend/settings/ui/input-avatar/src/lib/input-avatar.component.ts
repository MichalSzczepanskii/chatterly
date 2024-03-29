import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { FrontendSettingsUiFileImageModule } from '@chatterly/frontend/settings/ui/file-image';
import { User } from '@chatterly/shared/data-access';
import { FrontendSharedUiUserAvatarComponent } from '@chatterly/frontend/shared/ui/user-avatar';

@Component({
  selector: 'chatterly-input-avatar',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    FrontendSettingsUiFileImageModule,
    FrontendSharedUiUserAvatarComponent,
  ],
  template: `
    <input
      type="file"
      accept="image/png, image/jpeg"
      data-cy="imageUploadField"
      [multiple]="false"
      (change)="selectFile($event)"
      #imageUpload />
    <div class="button-wrapper">
      <img
        *ngIf="
          uploadedFile && (uploadedFile | fileImage | async) as vm;
          else customAvatar
        "
        [src]="vm"
        alt="profile image" />
      <ng-template #customAvatar>
        <chatterly-user-avatar [user]="user"></chatterly-user-avatar>
      </ng-template>
      <button
        class="btn"
        type="button"
        data-cy="uploadButton"
        (click)="openFilePicker()">
        {{ 'change' | transloco }}
      </button>
    </div>
  `,
  styleUrls: ['./input-avatar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputAvatarComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputAvatarComponent,
    },
  ],
})
export class InputAvatarComponent implements ControlValueAccessor {
  readonly fileRestrictions = {
    allowedExtensions: ['jpeg', 'png'],
    maxFileSize: 1024 * 1024 * 2.5,
  };
  @ViewChild('imageUpload', { static: false }) imageUploadEl!: ElementRef;
  @Input() user!: User;
  uploadedFile!: File;
  onChange!: (value: File) => void;
  onTouched!: () => void;
  isExtensionDisallowed!: boolean;
  isMaxFileSizeExceeded!: boolean;

  openFilePicker(): void {
    this.imageUploadEl.nativeElement.click();
  }

  selectFile(ev: Event): void {
    const element = ev.currentTarget as HTMLInputElement;
    if (!element.files) return;
    const file = element.files[0];
    const fileExtension = file.type.split('/')[1];
    this.isExtensionDisallowed =
      !this.fileRestrictions.allowedExtensions.includes(fileExtension);
    this.isMaxFileSizeExceeded = file.size > this.fileRestrictions.maxFileSize;
    this.uploadedFile = file;
    this.onChange(file);
    this.onTouched();
  }

  registerOnChange(fn: (value: File) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(image: File): void {
    this.uploadedFile = image;
  }

  validate({ value }: FormControl): ValidationErrors | null {
    if (this.isExtensionDisallowed) return { extensionDisallowed: true };
    else if (this.isMaxFileSizeExceeded) return { maxFileSizeExceeded: true };
    return null;
  }
}
