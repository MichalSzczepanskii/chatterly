import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, map } from 'rxjs/operators';
import * as ConversationActions from './conversation.actions';
import { ConversationService } from '../../services/conversation.service';

@Injectable()
export class ConversationEffects {
  loadConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.loadPrivateConversation),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      exhaustMap(action =>
        this.conversationService
          .getPrivateConversation(action.userId)
          .pipe(
            map(conversation =>
              ConversationActions.privateConversationSuccess({ conversation })
            )
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private conversationService: ConversationService
  ) {}
}
