import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Account, CardPaymentReceipt, CreditCardAccount, Transaction, TransferReceipt } from '@boa/models';
import { AccountService } from './account.service';
import { CreditCardService } from './credit-card.service';
import { MOCK_LATENCY_MS } from './mock-latency';
import { TransactionService } from './transaction.service';
import { TransferService } from './transfer.service';

describe('banking-data services', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('returns the two deposit accounts with fixture balances', fakeAsync(() => {
    let accounts: Account[] = [];
    TestBed.inject(AccountService)
      .getAccounts()
      .subscribe((value) => (accounts = value));
    tick(MOCK_LATENCY_MS);

    expect(accounts.map((account) => account.balance)).toEqual([8420.17, 24230.55]);
  }));

  it('returns recent deposit activity in fixture order', fakeAsync(() => {
    let transactions: Transaction[] = [];
    TestBed.inject(TransactionService)
      .getRecentActivity(3)
      .subscribe((value) => (transactions = value));
    tick(MOCK_LATENCY_MS);

    expect(transactions.map((transaction) => transaction.description)).toEqual([
      'Whole Foods',
      'Payroll Deposit',
      'Uber',
    ]);
  }));

  it('confirms a valid transfer', fakeAsync(() => {
    let receipt: TransferReceipt | undefined;
    TestBed.inject(TransferService)
      .submitTransfer({ fromAccountId: 'chk-1234', toAccountId: 'sav-5678', amount: 250 })
      .subscribe((value) => (receipt = value));
    tick(MOCK_LATENCY_MS);

    expect(receipt?.confirmationNumber).toMatch(/^TRF-\d{6}$/);
  }));

  it('rejects a transfer to the same account', () => {
    let error: Error | undefined;
    TestBed.inject(TransferService)
      .submitTransfer({ fromAccountId: 'chk-1234', toAccountId: 'chk-1234', amount: 10 })
      .subscribe({ error: (cause: Error) => (error = cause) });

    expect(error?.message).toContain('must differ');
  });

  it('exposes the credit card and confirms a payment', fakeAsync(() => {
    const service = TestBed.inject(CreditCardService);
    let card: CreditCardAccount | undefined;
    let receipt: CardPaymentReceipt | undefined;

    service.getCard().subscribe((value) => (card = value));
    service.submitPayment({ cardId: 'card-9012', fromAccountId: 'chk-1234', amount: 45 }).subscribe((value) => (receipt = value));
    tick(MOCK_LATENCY_MS);

    expect(card?.minimumPayment).toBe(45);
    expect(card?.paymentDueDate).toBe('Aug 28');
    expect(receipt?.confirmationNumber).toMatch(/^PMT-\d{6}$/);
  }));

  it('rejects a non-positive payment', () => {
    let error: Error | undefined;
    TestBed.inject(CreditCardService)
      .submitPayment({ cardId: 'card-9012', fromAccountId: 'chk-1234', amount: 0 })
      .subscribe({ error: (cause: Error) => (error = cause) });

    expect(error?.message).toContain('greater than zero');
  });
});
