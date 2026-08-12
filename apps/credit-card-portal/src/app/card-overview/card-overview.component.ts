import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardAccount, Transaction } from '@boa/models';
import { CreditCardService, TransactionService } from '@boa/banking-data';
import { BoaAnalyticsService } from '@boa/integrations';

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.scss'],
})
export class CardOverviewComponent implements OnInit {
  card$!: Observable<CreditCardAccount>;
  transactions$!: Observable<Transaction[]>;

  constructor(
    private readonly creditCardService: CreditCardService,
    private readonly transactionService: TransactionService,
    private readonly analytics: BoaAnalyticsService
  ) {}

  ngOnInit(): void {
    this.card$ = this.creditCardService.getCard();
    this.transactions$ = this.transactionService.getCardTransactions();
    this.analytics.track('account_viewed', { app: 'credit-card-portal', view: 'card-overview' });
  }
}
