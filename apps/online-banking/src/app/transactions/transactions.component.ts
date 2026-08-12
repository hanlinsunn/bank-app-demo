import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account, Transaction } from '@boa/models';
import { AccountService, TransactionService } from '@boa/banking-data';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  accounts$!: Observable<Account[]>;
  transactions$!: Observable<Transaction[]>;
  selectedAccountId = 'chk-1234';

  constructor(
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.accounts$ = this.accountService.getAccounts();
    this.transactions$ = this.transactionService.getDepositTransactions();
  }

  visibleTransactions(transactions: Transaction[] | null): Transaction[] {
    return (transactions ?? []).filter((transaction) => transaction.accountId === this.selectedAccountId);
  }

  accountLabel(accounts: Account[] | null): string {
    const account = (accounts ?? []).find((candidate) => candidate.id === this.selectedAccountId);
    return account ? `${account.nickname} ${account.maskedNumber}` : '';
  }

  get accountOptions$(): Observable<{ id: string; label: string }[]> {
    return this.accounts$.pipe(
      map((accounts) => accounts.map((account) => ({ id: account.id, label: `${account.nickname} ${account.maskedNumber}` })))
    );
  }
}
