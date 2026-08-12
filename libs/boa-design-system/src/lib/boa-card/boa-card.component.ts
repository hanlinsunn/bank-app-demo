import { Component, Input } from '@angular/core';

@Component({
  selector: 'boa-card',
  template: `
    <!-- The action slot must be declared before the catch-all slot: Angular matches
         projected nodes in declaration order, and a selector-less ng-content takes all. -->
    <ng-template #actions>
      <ng-content select="[boaCardActions]"></ng-content>
    </ng-template>
    <mat-card class="boa-card">
      <div class="boa-card__header" *ngIf="heading">
        <h2 class="boa-card__heading">{{ heading }}</h2>
        <span class="boa-card__subheading" *ngIf="subheading">{{ subheading }}</span>
      </div>
      <mat-card-content class="boa-card__content">
        <ng-content></ng-content>
      </mat-card-content>
      <mat-card-actions class="boa-card__actions" *ngIf="showActions">
        <ng-container [ngTemplateOutlet]="actions"></ng-container>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .boa-card {
        border-radius: 10px;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }

      .boa-card__content {
        flex: 1 1 auto;
      }

      .boa-card__header {
        display: flex;
        align-items: baseline;
        gap: 10px;
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
