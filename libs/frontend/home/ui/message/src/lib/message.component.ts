import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message, User } from '@chatterly/shared/data-access';
import { FrontendSharedUiUserAvatarComponent } from '@chatterly/frontend/shared/ui/user-avatar';

@Component({
  selector: 'chatterly-message',
  standalone: true,
  imports: [CommonModule, FrontendSharedUiUserAvatarComponent],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnChanges {
  @Input() message!: Message;
  @Input() user!: User & { profileImageFile?: File };
  isWrittenByUser = false;
  showTime = false;

  ngOnChanges(changes: SimpleChanges) {
    const userId = changes['user'].currentValue.id;
    const authorId = changes['message'].currentValue.author.id;
    this.isWrittenByUser = authorId === userId;
  }

  toggleTimeDisplay() {
    this.showTime = !this.showTime;
  }
}
