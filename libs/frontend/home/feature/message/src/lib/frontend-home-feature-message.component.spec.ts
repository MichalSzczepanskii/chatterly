import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendHomeFeatureMessageComponent } from './frontend-home-feature-message.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  ConversationState,
  loadPrivateConversation,
  selectConversation,
  selectConversationLoading,
  sendPrivateMessage,
} from '@chatterly/frontend/home/data-access';
import { MemoizedSelector } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { LoaderComponent } from '@chatterly/frontend/shared/ui/loader';
import { MockComponent, MockModule } from 'ng-mocks';
import { MessageComponent } from '@chatterly/frontend/home/ui/message';
import {
  AuthState,
  FrontendSharedDataAccessModule,
  selectUser,
} from '@chatterly/frontend/shared/data-access';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Conversation, User } from '@chatterly/shared/data-access';
import {
  findEl,
  MessageFactory,
  ParamMapFactory,
  setFieldValue,
  UserFactory,
} from '@chatterly/frontend/shared/spec-utils';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('FrontendHomeFeatureMessageComponent', () => {
  let component: FrontendHomeFeatureMessageComponent;
  let fixture: ComponentFixture<FrontendHomeFeatureMessageComponent>;
  let mockConversationStore: MockStore<ConversationState>;
  let mockAuthStore: MockStore<AuthState>;
  let mockConversationSelector: MemoizedSelector<
    ConversationState,
    Conversation
  >;
  let mockLoadingSelector: MemoizedSelector<ConversationState, boolean>;
  let mockAuthUserSelector: MemoizedSelector<AuthState, User>;
  let route: ActivatedRoute;

  const userMock = UserFactory.create();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FrontendHomeFeatureMessageComponent,
        ReactiveFormsModule,
        MockModule(FrontendSharedDataAccessModule),
        MockComponent(MessageComponent),
        MockComponent(LoaderComponent),
        RouterTestingModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendHomeFeatureMessageComponent);
    component = fixture.componentInstance;
    mockConversationStore = TestBed.inject(MockStore<ConversationState>);
    mockAuthStore = TestBed.inject(MockStore<AuthState>);
    route = TestBed.inject(ActivatedRoute);

    mockLoadingSelector = mockConversationStore.overrideSelector(
      selectConversationLoading,
      false
    );
    mockConversationSelector = mockConversationStore.overrideSelector(
      selectConversation,
      {
        id: 0,
        messages: [],
        users: [],
      }
    );
    mockAuthUserSelector = mockAuthStore.overrideSelector(selectUser, userMock);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display loader if loading in conversation state is set to true', () => {
    mockLoadingSelector.setResult(true);
    fixture.detectChanges();
    const loaderDE = fixture.debugElement.query(By.directive(LoaderComponent));
    const messagesDE = fixture.debugElement.queryAll(
      By.directive(MessageComponent)
    );
    expect(loaderDE).toBeTruthy();
    expect(messagesDE.length).toEqual(0);
  });

  it('should display messages', () => {
    const messages = MessageFactory.createMany(10);
    mockLoadingSelector.setResult(false);
    mockConversationSelector.setResult({
      id: 0,
      users: [],
      messages: messages,
    });
    fixture.detectChanges();
    const loaderDE = fixture.debugElement.query(By.directive(LoaderComponent));
    const messagesDE = fixture.debugElement.queryAll(
      By.directive(MessageComponent)
    );
    expect(loaderDE).toBeFalsy();
    messagesDE.forEach(message => {
      const messageComponent = message.componentInstance;
      expect(messages).toContain(messageComponent.message);
    });
  });

  describe('Conversation type - PRIVATE', () => {
    const params: ParamMap = ParamMapFactory.create({
      type: 'private',
      id: userMock.id.toString(),
    });

    beforeEach(() => {
      jest.spyOn(route, 'paramMap', 'get').mockReturnValue(of(params));
    });

    it('should dispatch loadPrivateConversation', () => {
      jest.spyOn(mockConversationStore, 'dispatch');
      fixture.detectChanges();
      expect(mockConversationStore.dispatch).toHaveBeenCalledWith(
        loadPrivateConversation({ userId: userMock.id })
      );
    });

    it('should display user name as conversation name if there are messages', () => {
      const message = MessageFactory.create({ author: userMock });
      mockConversationSelector.setResult({
        id: 0,
        users: [userMock],
        messages: [message],
      });
      mockAuthUserSelector.setResult(UserFactory.create());
      fixture.detectChanges();
      const header = findEl(fixture, 'conversationName');
      expect(header.nativeElement.textContent).toEqual(userMock.name);
    });

    //TODO: test for displaying user name if there is no conversation started

    it('should dispatch sendPrivateMessage if form is valid', () => {
      jest.spyOn(mockConversationStore, 'dispatch');
      fixture.detectChanges();
      const message = 'test message';
      setFieldValue(fixture, 'messageField', message);
      findEl(fixture, 'messageForm').triggerEventHandler('submit', {});
      expect(mockConversationStore.dispatch).toHaveBeenCalledWith(
        sendPrivateMessage({
          message: {
            text: message,
            author: userMock,
            createdAt: new Date(),
          },
          userId: userMock.id,
        })
      );
      expect(component.form.get('message').value).toBeNull();
    });

    it('should not dispatch sendPrivateMessage if message field is empty', () => {
      jest.spyOn(mockConversationStore, 'dispatch');
      fixture.detectChanges();
      findEl(fixture, 'messageForm').triggerEventHandler('submit', {});
      expect(mockConversationStore.dispatch).not.toHaveBeenCalledWith();
    });
  });
});
