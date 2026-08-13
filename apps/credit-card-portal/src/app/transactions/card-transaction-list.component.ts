import { Component, Input } from '@angular/core';
import { Transaction } from '@boa/models';

@Component({
  selector: 'app-card-transaction-list',
  template: `
    <ul class="txns">
      <li class="txns__row" *ngFor="let transaction of transactions">
        <span class="txns__date">{{ transaction.postedOn }}</span>
        <span class="txns__description">{{ transaction.description }}</span>
        <span class="txns__amount" [class.txns__amount--credit]="transaction.amount > 0">
          {{ transaction.amount | currency }}
        </span>
      </li>
      <li class="txns__empty" *ngIf="!transactions.length">No transactions to show.</li>
    </ul>
  `,
  styles: [
    `
      .txns {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .txns__row {
        display: grid;
        grid-template-columns: 84px 1fr auto;
        gap: 16px;
        align-items: baseline;
        padding: 13px 0;
        border-bottom: 1px solid var(--boa-border);
        font-size: 16px;
      }

      .txns__date {
        color: rgba(0, 0, 0, 0.54);
        font-size: 15px;
      }

      .txns__amount {
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }

      .txns__amount--credit {
        color: #137333;
      }

      .txns__empty {
        padding: 16px 0;
        color: rgba(0, 0, 0, 0.54);
      }
    `,
  ],
})
export class CardTransactionListComponent {
  @Input() transactions: Transaction[] = [];
}
