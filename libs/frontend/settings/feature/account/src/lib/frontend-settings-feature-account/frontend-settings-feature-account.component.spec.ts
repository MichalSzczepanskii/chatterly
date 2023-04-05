import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSettingsFeatureAccountComponent } from './frontend-settings-feature-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputAvatarComponent } from '@chatterly/frontend/settings/ui/input-avatar';
import {
  findEl,
  getTranslocoModule,
  setFieldValue,
  setFileFieldValue,
} from '@chatterly/frontend/shared/spec-utils';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  FrontendSharedDataAccessModule,
  selectUser,
} from '@chatterly/frontend/shared/data-access';
import { MockModule, MockProviders } from 'ng-mocks';
import { AccountSettingsService } from '@chatterly/frontend/settings/data-access';
import { of } from 'rxjs';
import { AlertService } from '@chatterly/frontend/shared/services/alert';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FrontendSettingsFeatureAccountComponent', () => {
  let component: FrontendSettingsFeatureAccountComponent;
  let fixture: ComponentFixture<FrontendSettingsFeatureAccountComponent>;
  let mockStore: MockStore;
  let accountSettingsService: AccountSettingsService;
  let alertService: AlertService;

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
      profilePicture: mockFile,
    };
    const fillForm = () => {
      setFieldValue(fixture, 'nameField', accountSettingsData.name);
      setFileFieldValue(fixture, 'imageUploadField', [
        accountSettingsData.profilePicture,
      ]);
    };

    beforeEach(() => {
      mockStore.overrideSelector(selectUser, mockUser);
      jest.spyOn(accountSettingsService, 'updateSettings');
    });

    it('should init form with user data', () => {
      fixture.detectChanges();
      expect(component.form.get('name').value).toEqual(mockUser.name);
    });

    it('should submit the form successfully', () => {
      jest
        .spyOn(accountSettingsService, 'updateSettings')
        .mockReturnValue(of(null));
      jest.spyOn(alertService, 'showSuccess');
      fixture.detectChanges();
      fillForm();
      fixture.detectChanges();
      findEl(fixture, 'form').triggerEventHandler('submit', {});
      expect(component.form.value).toStrictEqual(accountSettingsData);
      expect(accountSettingsService.updateSettings).toHaveBeenCalledWith(
        component.form.value
      );
      expect(alertService.showSuccess).toHaveBeenCalledWith({
        message: 'settings.account.success',
      });
    });

    it('should not submit the form if data did not changed', () => {
      fixture.detectChanges();
      findEl(fixture, 'form').triggerEventHandler('submit', {});
      expect(accountSettingsService.updateSettings).not.toHaveBeenCalled();
    });

    describe('dirty field detection', () => {
      it('should only send name field if its the only field that changed', () => {
        fixture.detectChanges();
        setFieldValue(fixture, 'nameField', accountSettingsData.name);
        findEl(fixture, 'form').triggerEventHandler('submit', {});
        expect(accountSettingsService.updateSettings).toHaveBeenCalledWith({
          name: accountSettingsData.name,
        });
      });

      it('should only send profilePicture field if its the only field that changed', () => {
        fixture.detectChanges();
        setFileFieldValue(fixture, 'imageUploadField', [
          accountSettingsData.profilePicture,
        ]);
        findEl(fixture, 'form').triggerEventHandler('submit', {});
        expect(accountSettingsService.updateSettings).toHaveBeenCalledWith({
          profilePicture: accountSettingsData.profilePicture,
        });
      });
    });
  });
});
