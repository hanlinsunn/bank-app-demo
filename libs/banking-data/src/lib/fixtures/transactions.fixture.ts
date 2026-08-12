import { Transaction } from '@boa/models';

export const DEPOSIT_TRANSACTIONS: Transaction[] = [
  { id: 'txn-001', accountId: 'chk-1234', postedOn: 'Aug 11', description: 'Whole Foods', amount: -82.14 },
  { id: 'txn-002', accountId: 'chk-1234', postedOn: 'Aug 09', description: 'Payroll Deposit', amount: 4220.0 },
  { id: 'txn-003', accountId: 'chk-1234', postedOn: 'Aug 08', description: 'Uber', amount: -18.42 },
  { id: 'txn-004', accountId: 'sav-5678', postedOn: 'Aug 01', description: 'Interest Paid', amount: 12.87 },
  { id: 'txn-005', accountId: 'sav-5678', postedOn: 'Jul 28', description: 'Transfer from Checking', amount: 500.0 },
];

export const CARD_TRANSACTIONS: Transaction[] = [
  { id: 'ctxn-001', accountId: 'card-9012', postedOn: 'Aug 10', description: 'Delta Air Lines', amount: -412.6 },
  { id: 'ctxn-002', accountId: 'card-9012', postedOn: 'Aug 07', description: 'Shell', amount: -61.03 },
  { id: 'ctxn-003', accountId: 'card-9012', postedOn: 'Aug 05', description: 'Statement Credit', amount: 25.0 },
  { id: 'ctxn-004', accountId: 'card-9012', postedOn: 'Aug 02', description: 'Apple Store', amount: -799.6 },
];
