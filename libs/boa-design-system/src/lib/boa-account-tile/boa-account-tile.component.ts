import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account } from '@boa/models';

@Component({
  selector: 'boa-account-tile',
  template: `
    <mat-card class="boa-account-tile" [class.boa-account-tile--clickable]="clickable" (click)="onSelect()">
      <div class="boa-account-tile__label">
        <span class="boa-account-tile__nickname">{{ account.nickname }}</span>
        <span class="boa-account-tile__number">{{ account.maskedNumber }}</span>
      </div>
      <div class="boa-account-tile__balance">{{ account.balance | currency }}</div>
      <div class="boa-account-tile__caption">{{ balanceCaption }}</div>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .boa-account-tile {
        padding: 18px;
        border-radius: 10px;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .boa-account-tile--clickable {
        cursor: pointer;
      }

      .boa-account-tile__label {
        display: flex;
        gap: 8px;
        align-items: baseline;
        color: rgba(0, 0, 0, 0.6);
        font-size: 13px;
      }

      .boa-account-tile__nickname {
        font-weight: 600;
        color: rgba(0, 0, 0, 0.87);
      }

      .boa-account-tile__balance {
        font-size: 26px;
        font-weight: 600;
      }

      .boa-account-tile__caption {
        color: rgba(0, 0, 0, 0.54);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.6px;
      }
    `,
  ],
})
export class BoaAccountTileComponent {
  @Input() account!: Account;
  @Input() balanceCaption = 'Available balance';
  @Input() clickable = false;
  @Output() selected = new EventEmitter<Account>();

  onSelect(): void {
    if (this.clickable) {
      this.selected.emit(this.account);
    }
  }
}
