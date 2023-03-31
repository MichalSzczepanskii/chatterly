import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAvatarComponent } from './input-avatar.component';
import { findEl } from '@chatterly/frontend/shared/spec-utils';

describe('FrontendSettingsUiInputAvatarComponent', () => {
  let component: InputAvatarComponent;
  let fixture: ComponentFixture<InputAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open file picker on button click', () => {
    const inputEl = findEl(fixture, 'imageUploadField').nativeElement;
    jest.spyOn(inputEl, 'click');
    findEl(fixture, 'uploadButton').nativeElement.click();
    fixture.detectChanges();
    expect(inputEl.click).toHaveBeenCalled();
  });

  it('should select a png file', () => {
    jest.spyOn(component, 'selectFile');
    const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
    const mockEvent = { target: { files: [mockFile] } };
    const fileInput = findEl(fixture, 'imageUploadField');
    fileInput.nativeElement.files = [mockFile];
    fileInput.nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.uploadedFile).toBeTruthy();
    expect(component.selectFile).toHaveBeenCalled();
    expect(component.selectFile).toHaveBeenCalledWith(mockEvent);
  });
});
