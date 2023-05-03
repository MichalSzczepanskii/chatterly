import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { ConversationType } from '@chatterly/frontend/shared/constants';
import { Store } from '@ngrx/store';
import {
  ConversationState,
  loadPrivateConversation,
  selectConversation,
  selectConversationLoading,
  sendPrivateMessage,
} from '@chatterly/frontend/home/data-access';
import { Conversation, Message, User } from '@chatterly/shared/data-access';
import { MessageComponent } from '@chatterly/frontend/home/ui/message';
import {
  AuthState,
  FrontendSharedDataAccessModule,
  selectUser,
} from '@chatterly/frontend/shared/data-access';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '@chatterly/frontend/shared/ui/loader';

@Component({
  selector: 'chatterly-frontend-home-feature-message',
  standalone: true,
  imports: [
    CommonModule,
    MessageComponent,
    FrontendSharedDataAccessModule,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './frontend-home-feature-message.component.html',
  styleUrls: ['./frontend-home-feature-message.component.scss'],
})
export class FrontendHomeFeatureMessageComponent implements OnInit {
  conversation$!: Observable<Conversation | null>;
  conversationType$!: Observable<ConversationType>;
  conversationName$!: Observable<string | undefined>;
  conversationLoading$?: Observable<boolean>;
  user$!: Observable<(User & { profileImageFile?: File }) | null>;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ConversationState>,
    private authStore: Store<AuthState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.conversationType$ = this.route.params.pipe(
      map(params => params['type'] as ConversationType)
    );

    this.conversationLoading$ = this.store.select(selectConversationLoading);
    this.route.paramMap
      .pipe(
        tap(params => {
          const type = params.get('type') as ConversationType;
          const id = params.get('id');
          if (!type || !id) throw Error('error');
          if (type === ConversationType.PRIVATE)
            this.store.dispatch(loadPrivateConversation({ userId: +id }));
        })
      )
      .subscribe();

    this.conversation$ = this.store.select(selectConversation);

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

    this.form = this.formBuilder.group({
      message: [null, Validators.required],
    });
  }

  sendMessage() {
    if (this.form.invalid) return;
    combineLatest([this.user$, this.route.paramMap]).subscribe(
      ([user, params]) => {
        const receiverId = params.get('id');
        if (!user || !receiverId) return;
        const message: Message = {
          text: this.form.get('message')?.value,
          author: user,
          createdAt: new Date(),
        };
        this.store.dispatch(
          sendPrivateMessage({ message, userId: +receiverId })
        );
        this.form.reset();
      }
    );
  }
}
