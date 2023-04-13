import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FrontendSidebarComponent } from '@chatterly/frontend/sidebar/feature/sidebar';
import { Store } from '@ngrx/store';
import {
  AuthState,
  FrontendSharedDataAccessModule,
  userDataRefresh,
} from '@chatterly/frontend/shared/data-access';

@Component({
  selector: 'chatterly-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FrontendSidebarComponent,
    FrontendSharedDataAccessModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(private authStore: Store<AuthState>) {}

  ngOnInit() {
    this.authStore.dispatch(userDataRefresh());
  }
}
