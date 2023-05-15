import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendSharedUiUserAvatarComponent } from '@chatterly/frontend/shared/ui/user-avatar';
import { Message, User } from '@chatterly/shared/data-access';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DateAgoPipeModule } from '@chatterly/frontend/shared/ui/date-ago';

@Component({
  selector: 'chatterly-contact',
  standalone: true,
  imports: [
    CommonModule,
    FrontendSharedUiUserAvatarComponent,
    DateAgoPipeModule,
  ],
  template: `
    <div class="contact-container" [class.active]="active$ | async">
      <div class="contact">
        <chatterly-user-avatar [user]="user"></chatterly-user-avatar>
        <div class="details">
          <div class="name">{{ user.name }}</div>
          <div class="last-message" *ngIf="lastMessage">
            {{
              lastMessage.text.length > 30
                ? (lastMessage.text | slice : 0 : 30) + '...'
                : lastMessage.text
            }}
          </div>
        </div>
        <div class="time" *ngIf="lastMessage">
          {{ lastMessage.createdAt | dateAgo }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @Input()
  user!: User;
  @Input()
  lastMessage?: Message;
  active$ = of(false);

  @HostListener('click') onClick() {
    this.router.navigate([`app/private/${this.user.id}`]);
  }

  constructor(private router: Router) {}
}
