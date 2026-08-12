import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CardPaymentReceipt, CardPaymentRequest, CreditCardAccount } from '@boa/models';
import { CREDIT_CARD, DEPOSIT_ACCOUNTS } from './fixtures/accounts.fixture';
import { MOCK_LATENCY_MS } from './mock-latency';
import { buildConfirmationNumber } from './transfer.service';

@Injectable({ providedIn: 'root' })
export class CreditCardService {
  getCard(): Observable<CreditCardAccount> {
    return of(CREDIT_CARD).pipe(delay(MOCK_LATENCY_MS));
  }

  getFundingAccounts(): Observable<{ id: string; label: string }[]> {
    const options = DEPOSIT_ACCOUNTS.map((account) => ({
      id: account.id,
      label: `${account.nickname} ${account.maskedNumber}`,
    }));
    return of(options).pipe(delay(MOCK_LATENCY_MS));
  }

  submitPayment(request: CardPaymentRequest): Observable<CardPaymentReceipt> {
    if (request.amount <= 0) {
      return throwError(() => new Error('Payment amount must be greater than zero.'));
    }

    const receipt: CardPaymentReceipt = {
      confirmationNumber: buildConfirmationNumber('PMT'),
      submittedAt: new Date().toISOString(),
      request,
    };
    return of(receipt).pipe(delay(MOCK_LATENCY_MS));
  }
}
