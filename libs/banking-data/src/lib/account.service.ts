import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Account } from '@boa/models';
import { DEPOSIT_ACCOUNTS } from './fixtures/accounts.fixture';
import { MOCK_LATENCY_MS } from './mock-latency';

@Injectable({ providedIn: 'root' })
export class AccountService {
  getAccounts(): Observable<Account[]> {
    return of(DEPOSIT_ACCOUNTS).pipe(delay(MOCK_LATENCY_MS));
  }

  getAccount(accountId: string): Observable<Account | undefined> {
    return this.getAccounts().pipe(map((accounts) => accounts.find((account) => account.id === accountId)));
  }
}
