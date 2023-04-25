import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { MockComponent } from 'ng-mocks';
import { FrontendSharedUiUserAvatarComponent } from '@chatterly/frontend/shared/ui/user-avatar';
import { UserFactory } from '@chatterly/frontend/shared/spec-utils';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        MockComponent(FrontendSharedUiUserAvatarComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.user = UserFactory.create();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
