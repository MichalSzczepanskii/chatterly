import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, map, switchMap } from 'rxjs/operators';
import * as ConversationActions from './conversation.actions';
import { ConversationService } from '../../services/conversation.service';
import { Store } from '@ngrx/store';
import { selectRouteParams } from '@chatterly/frontend/ngrx-routing/data-access';
import { RouterReducerState } from '@ngrx/router-store';

@Injectable()
export class ConversationEffects {
  loadConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.loadPrivateConversation),
      switchMap(() => this.store.select(selectRouteParams)),
      exhaustMap(params =>
        this.conversationService
          .getPrivateConversation(params['id'])
          .pipe(
            map(conversation =>
              ConversationActions.privateConversationSuccess({ conversation })
            )
          )
      )
    );
  });

  sendPrivateMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ConversationActions.sendPrivateMessage),
        exhaustMap(action =>
          this.conversationService.sendPrivateMessage(
            action.userId,
            action.message.text
          )
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private conversationService: ConversationService,
    private store: Store<RouterReducerState>
  ) {}
}
