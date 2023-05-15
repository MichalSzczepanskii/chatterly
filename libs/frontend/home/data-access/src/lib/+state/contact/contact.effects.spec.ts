import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { ContactEffects } from './contact.effects';
import {
  ApiErrorFactory,
  ConversationFactory,
} from '@chatterly/frontend/shared/spec-utils';
import { MockProvider } from 'ng-mocks';
import { ConversationService } from '../../services/conversation.service';
import * as ContactActions from './contact.actions';

describe('ContactEffects', () => {
  let actions$: Observable<any>;
  let effects: ContactEffects;
  let conversationService: ConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactEffects,
        provideMockActions(() => actions$),
        MockProvider(ConversationService),
      ],
    });

    effects = TestBed.inject(ContactEffects);
    conversationService = TestBed.inject(ConversationService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadContacts', () => {
    it('should return loadContactsSuccess if successful', done => {
      const conversations = ConversationFactory.createMany(5);
      jest
        .spyOn(conversationService, 'getConversations')
        .mockReturnValue(of(conversations));
      const expectedAction = {
        type: ContactActions.loadContactsSuccess.type,
        conversations,
      };

      actions$ = of({
        type: ContactActions.loadContacts.type,
      });

      effects.loadContacts$.subscribe(action => {
        expect(action).toEqual(expectedAction);
        done();
      });

      expect(conversationService.getConversations).toHaveBeenCalled();
    });

    it('should return loadContactsFailure on error', done => {
      const error = ApiErrorFactory.create(404, 'not found');
      jest
        .spyOn(conversationService, 'getConversations')
        .mockReturnValue(throwError(() => error));

      const expectedAction = {
        type: ContactActions.loadContactsFailure.type,
        error,
      };

      actions$ = of({
        type: ContactActions.loadContacts.type,
      });

      effects.loadContacts$.subscribe(action => {
        expect(action).toEqual(expectedAction);
        done();
      });

      expect(conversationService.getConversations).toHaveBeenCalled();
    });
  });
});
