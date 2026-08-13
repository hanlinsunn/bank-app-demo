import { Transaction } from '@boa/models';

/** Newest first; the account overview shows the leading slice as recent activity. */
export const DEPOSIT_TRANSACTIONS: Transaction[] = [
  { id: 'txn-001', accountId: 'chk-1234', postedOn: 'Aug 11', description: 'Whole Foods', amount: -82.14 },
  { id: 'txn-002', accountId: 'chk-1234', postedOn: 'Aug 09', description: 'Payroll Deposit', amount: 4220.0 },
  { id: 'txn-003', accountId: 'chk-1234', postedOn: 'Aug 08', description: 'Uber', amount: -18.42 },
  { id: 'txn-006', accountId: 'chk-1234', postedOn: 'Aug 08', description: 'Starbucks', amount: -6.75 },
  { id: 'txn-007', accountId: 'chk-1234', postedOn: 'Aug 07', description: 'Con Edison — Utilities', amount: -142.38 },
  { id: 'txn-008', accountId: 'chk-1234', postedOn: 'Aug 06', description: 'Zelle to Jordan Reyes', amount: -150.0 },
  { id: 'txn-009', accountId: 'chk-1234', postedOn: 'Aug 05', description: 'Verizon Wireless', amount: -95.0 },
  { id: 'txn-010', accountId: 'chk-1234', postedOn: 'Aug 04', description: 'Trader Joe\u2019s', amount: -64.29 },
  { id: 'txn-011', accountId: 'chk-1234', postedOn: 'Aug 03', description: 'Credit Card Payment ••9012', amount: -300.0 },
  { id: 'txn-012', accountId: 'chk-1234', postedOn: 'Aug 01', description: 'Rent — Harborview Apartments', amount: -2450.0 },
  { id: 'txn-013', accountId: 'chk-1234', postedOn: 'Jul 31', description: 'ATM Withdrawal — Main St', amount: -120.0 },
  { id: 'txn-014', accountId: 'chk-1234', postedOn: 'Jul 30', description: 'Netflix', amount: -22.99 },
  { id: 'txn-015', accountId: 'chk-1234', postedOn: 'Jul 26', description: 'Payroll Deposit', amount: 4220.0 },
  { id: 'txn-016', accountId: 'chk-1234', postedOn: 'Jul 25', description: 'Shell', amount: -48.11 },
  { id: 'txn-017', accountId: 'chk-1234', postedOn: 'Jul 24', description: 'Blue Bottle Coffee', amount: -11.5 },
  { id: 'txn-018', accountId: 'chk-1234', postedOn: 'Jul 22', description: 'State Farm Insurance', amount: -186.4 },
  { id: 'txn-004', accountId: 'sav-5678', postedOn: 'Aug 01', description: 'Interest Paid', amount: 12.87 },
  { id: 'txn-005', accountId: 'sav-5678', postedOn: 'Jul 28', description: 'Transfer from Checking', amount: 500.0 },
  { id: 'txn-019', accountId: 'sav-5678', postedOn: 'Jul 15', description: 'Transfer from Checking', amount: 500.0 },
  { id: 'txn-020', accountId: 'sav-5678', postedOn: 'Jul 05', description: 'Transfer to Checking', amount: -1200.0 },
  { id: 'txn-021', accountId: 'sav-5678', postedOn: 'Jul 01', description: 'Interest Paid', amount: 12.44 },
  { id: 'txn-022', accountId: 'sav-5678', postedOn: 'Jun 20', description: 'Tax Refund Deposit', amount: 1840.0 },
];

export const CARD_TRANSACTIONS: Transaction[] = [
  { id: 'ctxn-001', accountId: 'card-9012', postedOn: 'Aug 10', description: 'Delta Air Lines', amount: -412.6 },
  { id: 'ctxn-002', accountId: 'card-9012', postedOn: 'Aug 07', description: 'Shell', amount: -61.03 },
  { id: 'ctxn-003', accountId: 'card-9012', postedOn: 'Aug 05', description: 'Statement Credit', amount: 25.0 },
  { id: 'ctxn-004', accountId: 'card-9012', postedOn: 'Aug 02', description: 'Apple Store', amount: -799.6 },
  { id: 'ctxn-005', accountId: 'card-9012', postedOn: 'Aug 01', description: 'Marriott Bonvoy — Chicago', amount: -318.75 },
  { id: 'ctxn-006', accountId: 'card-9012', postedOn: 'Jul 30', description: 'Amazon.com', amount: -134.82 },
  { id: 'ctxn-007', accountId: 'card-9012', postedOn: 'Jul 29', description: 'Chipotle', amount: -14.6 },
  { id: 'ctxn-008', accountId: 'card-9012', postedOn: 'Jul 28', description: 'Cash Rewards Redeemed', amount: 42.18 },
  { id: 'ctxn-009', accountId: 'card-9012', postedOn: 'Jul 27', description: 'Home Depot', amount: -276.4 },
  { id: 'ctxn-010', accountId: 'card-9012', postedOn: 'Jul 25', description: 'Spotify Premium', amount: -11.99 },
  { id: 'ctxn-011', accountId: 'card-9012', postedOn: 'Jul 23', description: 'Payment — Thank You', amount: 300.0 },
  { id: 'ctxn-012', accountId: 'card-9012', postedOn: 'Jul 21', description: 'REI Co-op', amount: -189.35 },
  { id: 'ctxn-013', accountId: 'card-9012', postedOn: 'Jul 19', description: 'Lyft', amount: -27.4 },
  { id: 'ctxn-014', accountId: 'card-9012', postedOn: 'Jul 18', description: 'Whole Foods', amount: -96.22 },
];
