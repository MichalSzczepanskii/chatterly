import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { ConversationType } from '@chatterly/frontend/shared/constants';
import { Store } from '@ngrx/store';
import {
  ConversationState,
  loadPrivateConversation,
  selectConversation,
} from '@chatterly/frontend/home/data-access';
import { Conversation, User } from '@chatterly/shared/data-access';
import { FrontendHomeUiMessageComponent } from '@chatterly/frontend/home/ui/message';
import {
  AuthState,
  FrontendSharedDataAccessModule,
  selectUser,
} from '@chatterly/frontend/shared/data-access';

@Component({
  selector: 'chatterly-frontend-home-feature-message',
  standalone: true,
  imports: [
    CommonModule,
    FrontendHomeUiMessageComponent,
    FrontendSharedDataAccessModule,
  ],
  templateUrl: './frontend-home-feature-message.component.html',
  styleUrls: ['./frontend-home-feature-message.component.scss'],
})
export class FrontendHomeFeatureMessageComponent implements OnInit {
  conversation$!: Observable<Conversation | null>;
  conversationType$!: Observable<ConversationType>;
  conversationName$!: Observable<string | undefined>;
  user$!: Observable<(User & { profileImageFile?: File }) | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ConversationState>,
    private authStore: Store<AuthState>
  ) {}

  ngOnInit() {
    this.conversationType$ = this.route.params.pipe(
      map(params => params['type'] as ConversationType)
    );

    this.conversation$ = this.route.paramMap.pipe(
      switchMap(params => {
        const type = params.get('type') as ConversationType;
        const id = params.get('id');
        if (!type || !id) throw Error('error');
        if (type === ConversationType.PRIVATE)
          this.store.dispatch(loadPrivateConversation({ userId: +id }));
        return this.store.select(selectConversation);
      })
    );

    this.conversationName$ = this.route.paramMap.pipe(
      switchMap(params => {
        const type = params.get('type') as ConversationType;
        if (!type) throw Error('error');
        return this.store.select(selectConversation).pipe(
          switchMap(conversation => {
            if (type === ConversationType.GROUP) return of(conversation?.name);
            else
              return this.user$.pipe(
                map(
                  loggedUser =>
                    conversation?.users.filter(
                      user => user.id !== loggedUser?.id
                    )[0].name
                )
              );
          })
        );
      })
    );

    this.user$ = this.authStore.select(selectUser);
  }
}
