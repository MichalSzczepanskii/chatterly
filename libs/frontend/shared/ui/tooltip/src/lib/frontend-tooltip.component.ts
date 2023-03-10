import { Component } from '@angular/core';
import { TooltipPosition } from './tooltip.directive';

@Component({
  selector: 'chatterly-frontend-tooltip',
  template: `
    <div class="tooltip" [ngClass]="['tooltip--' + position]" [style.left]="left + 'px'" [style.top]="top + 'px'">
      {{ tooltip }}
    </div>
  `,
  styleUrls: ['frontend-tooltip.component.scss'],
})
export class FrontendTooltipComponent {
  tooltip = '';
  left = 0;
  top = 0;
  position = TooltipPosition.DEFAULT;
}
