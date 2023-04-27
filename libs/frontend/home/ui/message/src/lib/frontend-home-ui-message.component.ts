import {
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message, User } from '@chatterly/shared/data-access';
import { FrontendSharedUiUserAvatarComponent } from '@chatterly/frontend/shared/ui/user-avatar';

@Component({
  selector: 'chatterly-message',
  standalone: true,
  imports: [CommonModule, FrontendSharedUiUserAvatarComponent],
  templateUrl: './frontend-home-ui-message.component.html',
  styleUrls: ['./frontend-home-ui-message.component.scss'],
})
export class FrontendHomeUiMessageComponent implements OnChanges {
  @Input() message!: Message;
  @Input() user!: User & { profileImageFile?: File };
  isWrittenByUser!: boolean;
  showTime = false;

  @HostListener('click') onClick() {
    this.showTime = !this.showTime;
  }

  ngOnChanges(changes: SimpleChanges) {
    const userId = changes['user'].currentValue.id;
    const authorId = changes['message'].currentValue.author.id;
    this.isWrittenByUser = authorId === userId;
  }
}
