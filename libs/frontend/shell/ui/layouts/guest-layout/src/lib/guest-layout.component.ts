import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'chatterly-guest-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.scss'],
})
export class GuestLayoutComponent {}
