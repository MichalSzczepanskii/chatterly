import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendTooltipComponent } from './frontend-tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FrontendTooltipComponent, TooltipDirective],
  exports: [TooltipDirective],
})
export class FrontendTooltipModule {}
