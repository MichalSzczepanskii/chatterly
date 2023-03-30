import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { convertFileToBase64 } from '@chatterly/frontend/shared/utils';

@Component({
  selector: 'chatterly-input-avatar',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
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
        [src]="
          uploadedFile
            ? (showImageFromFile(uploadedFile) | async)
            : 'https://pbs.twimg.com/media/Dw4vhOaU0AwfOGj.png'
        " />
      <button class="btn" data-cy="uploadButton" (click)="openFilePicker()">
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
  ],
})
export class InputAvatarComponent implements ControlValueAccessor {
  readonly fileRestrictions = {
    allowedExtensions: ['jpeg', 'png'],
    maxFileSize: 2500000,
  };
  @ViewChild('imageUpload', { static: false }) imageUploadEl!: ElementRef;
  uploadedFile!: File;
  onChange = (file: File) => {
    return;
  };
  onTouched = () => {
    return;
  };

  openFilePicker(): void {
    this.imageUploadEl.nativeElement.click();
  }

  selectFile(ev: Event): void {
    const element = ev.currentTarget as HTMLInputElement;
    if (!element.files) return;
    const file = element.files[0];
    const fileExtension = file.type.split('/')[1];
    if (!this.fileRestrictions.allowedExtensions.includes(fileExtension)) {
      alert('wrong extension');
      return;
    }
    this.uploadedFile = file;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(image: File): void {
    this.uploadedFile = image;
  }

  async showImageFromFile(file: File): Promise<string> {
    return await convertFileToBase64(file);
  }
}
