import { Component, Input } from '@angular/core';

@Component({
  selector: 'boa-card',
  template: `
    <mat-card class="boa-card">
      <div class="boa-card__header" *ngIf="heading">
        <h2 class="boa-card__heading">{{ heading }}</h2>
        <span class="boa-card__subheading" *ngIf="subheading">{{ subheading }}</span>
      </div>
      <mat-card-content class="boa-card__content">
        <ng-content></ng-content>
      </mat-card-content>
      <mat-card-actions class="boa-card__actions" *ngIf="showActions">
        <ng-content select="[boaCardActions]"></ng-content>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .boa-card {
        border-radius: 10px;
      }

      .boa-card__header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        padding: 16px 16px 0;
      }

      .boa-card__heading {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }

      .boa-card__subheading {
        color: rgba(0, 0, 0, 0.54);
        font-size: 13px;
      }
    `,
  ],
})
export class BoaCardComponent {
  @Input() heading = '';
  @Input() subheading = '';
  @Input() showActions = false;
}
