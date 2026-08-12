import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, MarketSummary, Transaction } from '@boa/models';
import { AccountService, TransactionService } from '@boa/banking-data';
import { BoaAnalyticsService, MarketDataProviderService } from '@boa/integrations';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss'],
})
export class AccountOverviewComponent implements OnInit {
  accounts$!: Observable<Account[]>;
  recentActivity$!: Observable<Transaction[]>;
  marketSummary$!: Observable<MarketSummary>;

  constructor(
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionService,
    private readonly marketData: MarketDataProviderService,
    private readonly analytics: BoaAnalyticsService
  ) {}

  ngOnInit(): void {
    this.accounts$ = this.accountService.getAccounts();
    this.recentActivity$ = this.transactionService.getRecentActivity(3);
    this.marketSummary$ = this.marketData.getMarketSummary();
    this.analytics.track('account_viewed', { app: 'online-banking', view: 'account-overview' });
  }

  balanceCaption(account: Account): string {
    return account.type === 'savings' ? 'Available savings balance' : 'Available balance';
  }
}
