import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
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
import { RouterReducerState } from '@ngrx/router-store';
import { selectRouteParams } from '@chatterly/frontend/ngrx-routing/data-access';

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
  conversationName$!: Observable<string | undefined>;
  conversationLoading$?: Observable<boolean>;
  user$!: Observable<(User & { profileImageFile?: File }) | null>;
  form!: FormGroup;
  params!: Observable<Params>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ConversationState>,
    private authStore: Store<AuthState>,
    private formBuilder: FormBuilder,
    private routerStore: Store<RouterReducerState>
  ) {}

  ngOnInit() {
    this.conversationLoading$ = this.store.select(selectConversationLoading);
    this.store.dispatch(loadPrivateConversation());
    this.conversation$ = this.store.select(selectConversation);
    this.params = this.routerStore.select(selectRouteParams);
    this.user$ = this.authStore.select(selectUser);

    this.form = this.formBuilder.group({
      message: [null, Validators.required],
    });
  }

  sendMessage() {
    if (this.form.invalid) return;
    combineLatest([this.user$, this.params]).subscribe(([user, params]) => {
      const receiverId = params['id'];
      if (!user || !receiverId) return;
      const message: Message = {
        text: this.form.get('message')?.value,
        author: user,
        createdAt: new Date(),
      };
      console.log(message.createdAt);
      this.store.dispatch(sendPrivateMessage({ message, userId: +receiverId }));
      this.form.reset();
    });
  }
}
