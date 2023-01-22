import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FrontendShellModule } from '@chatterly/frontend/shell/feature';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [AppComponent],
  imports: [FrontendShellModule, RouterOutlet, HttpClientModule, TranslocoRootModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
