import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chatterly-loader',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`,
  styles: [
    `
      .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }

      .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 3rem;
        height: 3rem;
        margin: 8px;
        border: 0.4rem solid;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #ff9f9f transparent transparent transparent;
      }

      .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }

      .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }

      .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }

      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent {}
