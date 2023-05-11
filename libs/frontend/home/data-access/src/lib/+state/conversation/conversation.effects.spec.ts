import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import * as ConversationActions from './conversation.actions';

import { ConversationEffects } from './conversation.effects';
import { MockProvider } from 'ng-mocks';
import { ConversationService } from '../../services/conversation.service';
import { Conversation } from '@chatterly/shared/data-access';
import {
  MessageFactory,
  ParamsFactory,
  UserFactory,
} from '@chatterly/frontend/shared/spec-utils';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterReducerState } from '@ngrx/router-store';
import { MemoizedSelector } from '@ngrx/store';
import { Params } from '@angular/router';
import { selectRouteParams } from '@chatterly/frontend/ngrx-routing/data-access';
import { ConversationType } from '@chatterly/frontend/shared/constants';

describe('ConversationEffects', () => {
  let actions$: Observable<any>;
  let effects: ConversationEffects;
  let conversationService: ConversationService;
  let routerStore: MockStore<RouterReducerState>;
  let selectParams: MemoizedSelector<RouterReducerState, Params>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConversationEffects,
        provideMockActions(() => actions$),
        MockProvider(ConversationService),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ConversationEffects);
    conversationService = TestBed.inject(ConversationService);
    routerStore = TestBed.inject(MockStore<RouterReducerState>);
    selectParams = routerStore.overrideSelector(
      selectRouteParams,
      ParamsFactory.create({
        id: '1',
        type: ConversationType.PRIVATE,
      })
    );
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('LoadPrivateConversation', () => {
    it('should return PrivateConversationSuccess', done => {
      const conversation: Conversation = {
        id: 10,
        messages: [
          {
            id: 0,
            author: UserFactory.create(),
            createdAt: new Date(),
            text: 'test',
          },
        ],
        users: UserFactory.createMany(2),
      };
      const userId = 0;
      jest
        .spyOn(conversationService, 'getPrivateConversation')
        .mockReturnValue(of(conversation));
      selectParams.setResult(
        ParamsFactory.create({
          id: userId.toString(),
          type: ConversationType.PRIVATE,
        })
      );

      actions$ = of({
        type: ConversationActions.loadPrivateConversation.type,
      });

      effects.loadConversation$.subscribe(action => {
        expect(conversationService.getPrivateConversation).toHaveBeenCalledWith(
          userId
        );
        expect(action).toEqual({
          type: ConversationActions.privateConversationSuccess.type,
          conversation: conversation,
        });
        done();
      });
    });
  });

  describe('SendPrivateMessage', () => {
    it('should call sendPrivateMessage from ConversationService', () => {
      jest.spyOn(conversationService, 'sendPrivateMessage');
      const userId = 0;
      const message = MessageFactory.create();

      actions$ = of({
        type: ConversationActions.sendPrivateMessage.type,
        userId,
        message,
      });

      effects.sendPrivateMessage$.subscribe();
      expect(conversationService.sendPrivateMessage).toHaveBeenCalledWith(
        userId,
        message.text
      );
    });
  });
});
