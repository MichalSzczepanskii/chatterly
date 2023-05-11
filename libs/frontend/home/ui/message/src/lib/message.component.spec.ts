import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import {
  findEl,
  MessageFactory,
  UserFactory,
} from '@chatterly/frontend/shared/spec-utils';
import { MockComponent } from 'ng-mocks';
import { FrontendSharedUiUserAvatarComponent } from '@chatterly/frontend/shared/ui/user-avatar';
import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FrontendHomeUiMessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MessageComponent,
        MockComponent(FrontendSharedUiUserAvatarComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.message = MessageFactory.create();
    component.user = UserFactory.create();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display time if showTime is true', () => {
    component.showTime = true;
    fixture.detectChanges();
    const timeEl = findEl(fixture, 'messageTime');
    expect(timeEl).toBeTruthy();
  });

  describe('show time toggle', () => {
    function clickOnMessage() {
      const messageContent = findEl(fixture, 'messageContent');
      messageContent.nativeElement.click();
    }

    it('should set showTime to false', () => {
      component.showTime = true;
      fixture.detectChanges();
      clickOnMessage();
      expect(component.showTime).toBe(false);
    });

    it('should set showTime to false', () => {
      component.showTime = false;
      fixture.detectChanges();
      clickOnMessage();
      expect(component.showTime).toBe(true);
    });
  });

  describe('message was written by logged user', () => {
    const user = UserFactory.create();
    const message = MessageFactory.create({ author: user });
    beforeEach(() => {
      component.message = message;
      component.user = user;
      component.ngOnChanges({
        message: new SimpleChange(null, message, true),
        user: new SimpleChange(null, user, true),
      });
    });

    it('should set isWrittenByUser', () => {
      fixture.detectChanges();
      expect(component.isWrittenByUser).toBe(true);
    });

    it('should not display an avatar', () => {
      fixture.detectChanges();
      const avatar = fixture.debugElement.query(
        By.directive(FrontendSharedUiUserAvatarComponent)
      );
      expect(avatar).toBeFalsy();
    });
  });
});
