import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import * as ConversationActions from './conversation.actions';

import { ConversationEffects } from './conversation.effects';
import { MockProvider } from 'ng-mocks';
import { ConversationService } from '../../services/conversation.service';
import { Conversation } from '@chatterly/shared/data-access';
import { UserFactory } from '@chatterly/frontend/shared/spec-utils';

describe('ConversationEffects', () => {
  let actions$: Observable<any>;
  let effects: ConversationEffects;
  let conversationService: ConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConversationEffects,
        provideMockActions(() => actions$),
        MockProvider(ConversationService),
      ],
    });

    effects = TestBed.inject(ConversationEffects);
    conversationService = TestBed.inject(ConversationService);
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
      };
      const userId = 0;
      jest
        .spyOn(conversationService, 'getPrivateConversation')
        .mockReturnValue(of(conversation));

      actions$ = of({
        type: ConversationActions.loadPrivateConversation.type,
        userId,
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
});
