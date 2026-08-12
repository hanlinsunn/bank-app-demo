import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TransferReceipt, TransferRequest } from '@boa/models';
import { MOCK_LATENCY_MS } from './mock-latency';

@Injectable({ providedIn: 'root' })
export class TransferService {
  submitTransfer(request: TransferRequest): Observable<TransferReceipt> {
    if (request.fromAccountId === request.toAccountId) {
      return throwError(() => new Error('Source and destination accounts must differ.'));
    }
    if (request.amount <= 0) {
      return throwError(() => new Error('Transfer amount must be greater than zero.'));
    }

    const receipt: TransferReceipt = {
      confirmationNumber: buildConfirmationNumber('TRF'),
      submittedAt: new Date().toISOString(),
      request,
    };
    return of(receipt).pipe(delay(MOCK_LATENCY_MS));
  }
}

export function buildConfirmationNumber(prefix: string): string {
  const suffix = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0');
  return `${prefix}-${suffix}`;
}
