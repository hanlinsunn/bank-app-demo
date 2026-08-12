import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardAccount, Transaction } from '@boa/models';
import { CreditCardService, TransactionService } from '@boa/banking-data';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  card$!: Observable<CreditCardAccount>;
  transactions$!: Observable<Transaction[]>;

  constructor(
    private readonly creditCardService: CreditCardService,
    private readonly transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.card$ = this.creditCardService.getCard();
    this.transactions$ = this.transactionService.getCardTransactions();
  }
}
