import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Transaction } from '@boa/models';
import { CARD_TRANSACTIONS, DEPOSIT_TRANSACTIONS } from './fixtures/transactions.fixture';
import { MOCK_LATENCY_MS } from './mock-latency';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  getDepositTransactions(): Observable<Transaction[]> {
    return of(DEPOSIT_TRANSACTIONS).pipe(delay(MOCK_LATENCY_MS));
  }

  getCardTransactions(): Observable<Transaction[]> {
    return of(CARD_TRANSACTIONS).pipe(delay(MOCK_LATENCY_MS));
  }

  getRecentActivity(limit: number): Observable<Transaction[]> {
    return this.getDepositTransactions().pipe(map((transactions) => transactions.slice(0, limit)));
  }
}
