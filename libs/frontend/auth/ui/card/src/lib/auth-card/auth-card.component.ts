import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chatterly-auth-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .card {
        background-color: white;
        padding: 3.5rem;
        border-radius: 0.6rem;
      }
    `,
  ],
})
export class AuthCardComponent {}
