import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSharedUiUserAvatarComponent } from './frontend-shared-ui-user-avatar.component';

describe('FrontendSharedUiUserAvatarComponent', () => {
  let component: FrontendSharedUiUserAvatarComponent;
  let fixture: ComponentFixture<FrontendSharedUiUserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendSharedUiUserAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendSharedUiUserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
