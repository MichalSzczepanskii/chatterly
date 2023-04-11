import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FrontendShellModule } from '@chatterly/frontend/shell/feature';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontendSharedServicesAlertModule } from '@chatterly/frontend/shared/services/alert';
import { ToastModule } from 'primeng/toast';
import { FrontendCoreModule } from '@chatterly/frontend/core/feature';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FrontendShellModule,
    RouterOutlet,
    HttpClientModule,
    TranslocoRootModule,
    BrowserAnimationsModule,
    ToastModule,
    FrontendSharedServicesAlertModule,
    FrontendCoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
