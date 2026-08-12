import { Component, Input } from '@angular/core';

export type BoaAlertTone = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'boa-alert',
  template: `
    <div class="boa-alert" [ngClass]="'boa-alert--' + tone" role="status">
      <mat-icon class="boa-alert__icon">{{ icon }}</mat-icon>
      <div class="boa-alert__body">
        <strong class="boa-alert__title" *ngIf="title">{{ title }}</strong>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .boa-alert {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        padding: 12px 14px;
        border-radius: 8px;
        border-left: 4px solid transparent;
        font-size: 14px;
      }

      .boa-alert__title {
        display: block;
      }

      .boa-alert--info {
        background: #e8f0fe;
        border-left-color: #1a73e8;
      }

      .boa-alert--success {
        background: #e6f4ea;
        border-left-color: #137333;
      }

      .boa-alert--warning {
        background: #fef7e0;
        border-left-color: #b06000;
      }

      .boa-alert--error {
        background: #fce8e6;
        border-left-color: #c5221f;
      }
    `,
  ],
})
export class BoaAlertComponent {
  @Input() tone: BoaAlertTone = 'info';
  @Input() title = '';

  get icon(): string {
    switch (this.tone) {
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  }
}
