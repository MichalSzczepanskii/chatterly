import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendSharedUiUserAvatarComponent } from '@chatterly/frontend/shared/ui/user-avatar';
import { User } from '@chatterly/shared/data-access';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'chatterly-contact',
  standalone: true,
  imports: [CommonModule, FrontendSharedUiUserAvatarComponent],
  template: `
    <div class="contact-container" [class.active]="active$ | async">
      <div class="contact">
        <chatterly-user-avatar [user]="user"></chatterly-user-avatar>
        <div class="details">
          <div class="name">{{ user.name }}</div>
          <div class="last-message" *ngIf="lastMessage">{{ lastMessage }}</div>
        </div>
        <div class="time" *ngIf="messageTime">{{ messageTime }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @Input()
  user!: User;
  @Input()
  lastMessage?: string;
  @Input()
  messageTime?: string;
  active$ = of(false);

  @HostListener('click') onClick() {
    this.router.navigate([`app/private/${this.user.id}`]);
  }

  constructor(private router: Router) {}
}
