import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSettingsFeatureAccountComponent } from './frontend-settings-feature-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputAvatarComponent } from '@chatterly/frontend/settings/ui/input-avatar';
import {
  findEl,
  getTranslocoModule,
  markFieldAsBlurred,
  setFieldValue,
  setFileFieldValue,
} from '@chatterly/frontend/shared/spec-utils';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  FrontendSharedDataAccessModule,
  selectUser,
  userDataRefresh,
} from '@chatterly/frontend/shared/data-access';
import { MockModule, MockProviders } from 'ng-mocks';
import { AccountSettingsService } from '@chatterly/frontend/settings/data-access';
import { of, throwError } from 'rxjs';
import { AlertService } from '@chatterly/frontend/shared/services/alert';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslocoPipe } from '@ngneat/transloco';

describe('FrontendSettingsFeatureAccountComponent', () => {
  let component: FrontendSettingsFeatureAccountComponent;
  let fixture: ComponentFixture<FrontendSettingsFeatureAccountComponent>;
  let mockStore: MockStore;
  let accountSettingsService: AccountSettingsService;
  let alertService: AlertService;
  let translocoSpy: jest.SpyInstance;

  const mockUser = {
    id: 1,
    email: 'testuser@gmail.com',
    name: 'oldUserName',
    isActive: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        ReactiveFormsModule,
        InputAvatarComponent,
        MockModule(FrontendSharedDataAccessModule),
        FrontendSettingsFeatureAccountComponent,
        HttpClientTestingModule,
      ],
      providers: [provideMockStore(), MockProviders(AlertService)],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendSettingsFeatureAccountComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    accountSettingsService = TestBed.inject(AccountSettingsService);
    alertService = TestBed.inject(AlertService);
  });

  describe('form', () => {
    const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
    const accountSettingsData = {
      name: 'testUser',
      profileImage: mockFile,
    };
    const fillForm = () => {
      setFieldValue(fixture, 'nameField', accountSettingsData.name);
      setFileFieldValue(fixture, 'imageUploadField', [
        accountSettingsData.profileImage,
      ]);
    };

    beforeEach(() => {
      mockStore.overrideSelector(selectUser, mockUser);
      jest.spyOn(accountSettingsService, 'updateSettings');
      translocoSpy = jest.spyOn(TranslocoPipe.prototype, 'transform');
    });

    it('should init form with user data', () => {
      fixture.detectChanges();
      expect(component.form.get('name').value).toEqual(mockUser.name);
    });

    it('should make submit button disabled if no data was changed', () => {
      fixture.detectChanges();
      expect(findEl(fixture, 'submitButton').properties.disabled).toBe(true);
    });

    it('should submit the form successfully', () => {
      jest
        .spyOn(accountSettingsService, 'updateSettings')
        .mockReturnValue(of(null));
      jest.spyOn(alertService, 'showSuccess');
      jest.spyOn(mockStore, 'dispatch');
      fixture.detectChanges();
      fillForm();
      fixture.detectChanges();
      expect(findEl(fixture, 'submitButton').properties.disabled).toBe(false);
      findEl(fixture, 'form').triggerEventHandler('submit', {});
      expect(component.form.value).toStrictEqual(accountSettingsData);
      expect(accountSettingsService.updateSettings).toHaveBeenCalledWith(
        component.form.value
      );
      expect(alertService.showSuccess).toHaveBeenCalledWith({
        message: 'settings.account.success',
      });
      expect(mockStore.dispatch).toHaveBeenCalledWith(userDataRefresh());
    });

    it('should handle form failure', () => {
      jest
        .spyOn(accountSettingsService, 'updateSettings')
        .mockReturnValue(throwError(() => new Error('error')));
      jest.spyOn(alertService, 'showError');
      jest.spyOn(mockStore, 'dispatch');
      fixture.detectChanges();
      fillForm();
      findEl(fixture, 'form').triggerEventHandler('submit', {});
      expect(accountSettingsService.updateSettings).toHaveBeenCalled();
      expect(alertService.showError).toHaveBeenCalledWith({
        message: 'settings.account.error',
      });
      expect(mockStore.dispatch).not.toHaveBeenCalledWith(userDataRefresh());
    });

    it('should not submit the form if data did not changed', () => {
      fixture.detectChanges();
      findEl(fixture, 'form').triggerEventHandler('submit', {});
      expect(accountSettingsService.updateSettings).not.toHaveBeenCalled();
    });

    it('should mark name as required', () => {
      fixture.detectChanges();
      setFieldValue(fixture, 'nameField', null);
      markFieldAsBlurred(fixture, 'nameField');
      fixture.detectChanges();
      const errorMessageEl = findEl(
        fixture,
        'control-error-name'
      ).nativeElement;
      expect(errorMessageEl.textContent).toBeTruthy();
      expect(translocoSpy).toHaveBeenCalledWith('validation.name.required');
      expect(findEl(fixture, 'submitButton').properties.disabled).toBe(true);
    });

    it('should fails if name is shorter than 5 characters', () => {
      fixture.detectChanges();
      setFieldValue(fixture, 'nameField', 'test');
      markFieldAsBlurred(fixture, 'nameField');
      fixture.detectChanges();
      const errorMessageEl = findEl(
        fixture,
        'control-error-name'
      ).nativeElement;
      expect(errorMessageEl.textContent).toBeTruthy();
      expect(translocoSpy).toHaveBeenCalledWith('validation.name.minLength', {
        minLength: 5,
      });
      expect(findEl(fixture, 'submitButton').properties.disabled).toBe(true);
    });

    it('should fails if profile picture has disallowed extension', () => {
      fixture.detectChanges();
      const mockFile = new File([''], 'testImage.png', { type: 'image/gif' });
      setFileFieldValue(fixture, 'imageUploadField', [mockFile]);
      fixture.detectChanges();
      const errorMessageEl = findEl(
        fixture,
        'control-error-profileImage'
      ).nativeElement;
      expect(errorMessageEl.textContent).toBeTruthy();
      expect(translocoSpy).toHaveBeenCalledWith(
        'validation.profileImage.extensionDisallowed'
      );
      expect(findEl(fixture, 'submitButton').properties.disabled).toBe(true);
    });

    it('should fails if profile picture file size exceed 2.5MB', () => {
      fixture.detectChanges();
      const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
      Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 * 2.5 + 1 });
      setFileFieldValue(fixture, 'imageUploadField', [mockFile]);
      fixture.detectChanges();
      const errorMessageEl = findEl(
        fixture,
        'control-error-profileImage'
      ).nativeElement;
      expect(errorMessageEl.textContent).toBeTruthy();
      expect(translocoSpy).toHaveBeenCalledWith(
        'validation.profileImage.maxFileSizeExceeded'
      );
      expect(findEl(fixture, 'submitButton').properties.disabled).toBe(true);
    });

    it('should reset the form to default values if cancel button was clicked', () => {
      fixture.detectChanges();
      const formInitialValue = Object.assign({}, component.form.value);
      fillForm();
      fixture.detectChanges();
      findEl(fixture, 'cancelButton').nativeElement.click();
      expect(component.form.value).toEqual(formInitialValue);
    });

    describe('dirty field detection', () => {
      it('should only send name field if its the only field that changed', () => {
        fixture.detectChanges();
        setFieldValue(fixture, 'nameField', accountSettingsData.name);
        fixture.detectChanges();
        findEl(fixture, 'form').triggerEventHandler('submit', {});
        expect(findEl(fixture, 'submitButton').properties.disabled).toBe(false);
        expect(accountSettingsService.updateSettings).toHaveBeenCalledWith({
          name: accountSettingsData.name,
        });
      });

      it('should only send profileImage field if its the only field that changed', () => {
        fixture.detectChanges();
        setFileFieldValue(fixture, 'imageUploadField', [
          accountSettingsData.profileImage,
        ]);
        fixture.detectChanges();
        findEl(fixture, 'form').triggerEventHandler('submit', {});
        expect(findEl(fixture, 'submitButton').properties.disabled).toBe(false);
        expect(accountSettingsService.updateSettings).toHaveBeenCalledWith({
          profileImage: accountSettingsData.profileImage,
        });
      });
    });
  });
});
