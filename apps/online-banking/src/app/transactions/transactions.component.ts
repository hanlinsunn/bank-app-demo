import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Account, Transaction } from '@boa/models';
import { AccountService, TransactionService } from '@boa/banking-data';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  accountOptions$!: Observable<{ id: string; label: string }[]>;
  transactions$!: Observable<Transaction[]>;
  readonly account = new FormControl('chk-1234', { nonNullable: true });

  constructor(
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.accountOptions$ = this.accountService.getAccounts().pipe(
      map((accounts: Account[]) =>
        accounts.map((account) => ({ id: account.id, label: `${account.nickname} ${account.maskedNumber}` }))
      ),
      shareReplay(1)
    );
    this.transactions$ = this.transactionService.getDepositTransactions().pipe(shareReplay(1));
  }

  visibleTransactions(transactions: Transaction[] | null): Transaction[] {
    return (transactions ?? []).filter((transaction) => transaction.accountId === this.account.value);
  }
}
