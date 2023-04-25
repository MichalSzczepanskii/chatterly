import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSharedUiUserAvatarComponent } from './frontend-shared-ui-user-avatar.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { FrontendSettingsUiFileImageModule } from '@chatterly/frontend/settings/ui/file-image';
import { UserService } from '@chatterly/frontend/shared/data-access';

describe('FrontendSharedUiUserAvatarComponent', () => {
  let component: FrontendSharedUiUserAvatarComponent;
  let fixture: ComponentFixture<FrontendSharedUiUserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FrontendSharedUiUserAvatarComponent,
        MockModule(FrontendSettingsUiFileImageModule),
      ],
      providers: [MockProvider(UserService)],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendSharedUiUserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
