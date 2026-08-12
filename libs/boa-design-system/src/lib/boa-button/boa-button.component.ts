import { Component, EventEmitter, Input, Output } from '@angular/core';

export type BoaButtonVariant = 'primary' | 'secondary' | 'ghost';

@Component({
  selector: 'boa-button',
  template: `
    <button
      *ngIf="variant === 'primary'"
      mat-raised-button
      color="primary"
      class="boa-button"
      [type]="type"
      [disabled]="disabled"
      (click)="pressed.emit()"
    >
      <ng-container *ngTemplateOutlet="label"></ng-container>
    </button>

    <button
      *ngIf="variant === 'secondary'"
      mat-stroked-button
      color="primary"
      class="boa-button"
      [type]="type"
      [disabled]="disabled"
      (click)="pressed.emit()"
    >
      <ng-container *ngTemplateOutlet="label"></ng-container>
    </button>

    <button *ngIf="variant === 'ghost'" mat-button class="boa-button" [type]="type" [disabled]="disabled" (click)="pressed.emit()">
      <ng-container *ngTemplateOutlet="label"></ng-container>
    </button>

    <ng-template #label><ng-content></ng-content></ng-template>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      .boa-button {
        font-weight: 600;
        letter-spacing: 0.2px;
      }
    `,
  ],
})
export class BoaButtonComponent {
  @Input() variant: BoaButtonVariant = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Output() pressed = new EventEmitter<void>();
}
