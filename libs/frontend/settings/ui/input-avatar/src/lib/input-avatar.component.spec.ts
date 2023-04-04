import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAvatarComponent } from './input-avatar.component';
import {
  findEl,
  getTranslocoModule,
} from '@chatterly/frontend/shared/spec-utils';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FrontendSettingsUiInputAvatarComponent', () => {
  let inputAvatarComponent: InputAvatarComponent;
  let hostComponent: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  const fileCache = new WeakMap();

  Object.defineProperty(HTMLInputElement.prototype, 'files', {
    set(fileList) {
      fileCache.set(this, fileList);
      Object.defineProperty(this, 'files', {
        get() {
          return fileCache.get(this);
        },
        set(value) {
          fileCache.set(this, value);
        },
      });
    },
  });

  @Component({
    template: `
      <form [formGroup]="form">
        <chatterly-input-avatar
          #inputAvatar
          formControlName="control"></chatterly-input-avatar>
      </form>
    `,
  })
  class HostComponent {
    public control = new FormControl<File>(null);
    public form = new FormGroup({ control: this.control });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InputAvatarComponent,
        ReactiveFormsModule,
        getTranslocoModule(),
      ],
      declarations: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    inputAvatarComponent = fixture.debugElement.query(
      By.directive(InputAvatarComponent)
    ).componentInstance;
  });

  describe('form control without initial value', () => {
    it('should open file picker on button click', () => {
      fixture.detectChanges();
      const inputEl = findEl(fixture, 'imageUploadField').nativeElement;
      jest.spyOn(inputEl, 'click');
      findEl(fixture, 'uploadButton').nativeElement.click();
      fixture.detectChanges();
      expect(inputEl.click).toHaveBeenCalled();
    });

    function addFileToInput(mockFile: File) {
      const fileInput = findEl(fixture, 'imageUploadField');
      fileInput.nativeElement.files = [mockFile];
      fileInput.nativeElement.dispatchEvent(new Event('change'));
    }

    function expectUpload(mockFile: File) {
      addFileToInput(mockFile);
      fixture.detectChanges();
      expect(inputAvatarComponent.uploadedFile).toBe(mockFile);
      expect(inputAvatarComponent.selectFile).toHaveBeenCalled();
      expect(hostComponent.control.value).toBe(mockFile);
      expect(hostComponent.form.valid).toBeTruthy();
    }

    it('should upload a png file', () => {
      fixture.detectChanges();
      jest.spyOn(inputAvatarComponent, 'selectFile');
      const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
      expectUpload(mockFile);
    });

    it('should upload a png file with size is 2.5MB', () => {
      fixture.detectChanges();
      jest.spyOn(inputAvatarComponent, 'selectFile');
      const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
      Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 * 2.5 });
      expectUpload(mockFile);
    });

    it('should upload a png file with size below 2.5MB', () => {
      fixture.detectChanges();
      jest.spyOn(inputAvatarComponent, 'selectFile');
      const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
      Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 * 2.5 - 1 });
      expectUpload(mockFile);
    });

    it('should make form invalid if unsupported file is uploaded', () => {
      fixture.detectChanges();
      jest.spyOn(inputAvatarComponent, 'selectFile');
      const mockFile = new File([''], 'testImage.png', { type: 'image/gif' });
      addFileToInput(mockFile);
      fixture.detectChanges();
      expect(inputAvatarComponent.selectFile).toHaveBeenCalled();
      expect(hostComponent.form.invalid).toBeTruthy();
      expect(
        hostComponent.control.hasError('extensionDisallowed')
      ).toBeTruthy();
    });

    it('should make form invalid if file size exceed 2.5MB', () => {
      fixture.detectChanges();
      jest.spyOn(inputAvatarComponent, 'selectFile');
      const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
      Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 * 2.5 + 1 });
      addFileToInput(mockFile);
      fixture.detectChanges();
      expect(inputAvatarComponent.selectFile).toHaveBeenCalled();
      expect(hostComponent.form.invalid).toBeTruthy();
      expect(
        hostComponent.control.hasError('maxFileSizeExceeded')
      ).toBeTruthy();
    });
  });

  describe('form control with initial value', () => {
    it('should set uploadedFile to initial value file', () => {
      const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
      const control = new FormControl<File>(mockFile);
      hostComponent.form = new FormGroup({ control: control });
      fixture.detectChanges();
      expect(inputAvatarComponent.uploadedFile).toBe(mockFile);
    });
  });
});
