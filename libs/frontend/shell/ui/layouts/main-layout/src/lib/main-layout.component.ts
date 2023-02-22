import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FrontendSidebarComponent } from '@chatterly/frontend/sidebar/feature/sidebar';

@Component({
  selector: 'chatterly-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FrontendSidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {}
