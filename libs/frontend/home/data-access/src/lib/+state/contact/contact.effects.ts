import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as ContactActions from './contact.actions';
import { ConversationService } from '../../services/conversation.service';
import { of } from 'rxjs';

@Injectable()
export class ContactEffects {
  loadContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContactActions.loadContacts),
      exhaustMap(() =>
        this.conversationService.getConversations().pipe(
          map(conversations =>
            ContactActions.loadContactsSuccess({ conversations })
          ),
          catchError(error => of(ContactActions.loadContactsFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private conversationService: ConversationService
  ) {}
}
