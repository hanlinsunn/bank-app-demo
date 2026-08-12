import { Account, CreditCardAccount } from '@boa/models';

export const DEPOSIT_ACCOUNTS: Account[] = [
  {
    id: 'chk-1234',
    type: 'checking',
    nickname: 'Advantage Plus Banking',
    maskedNumber: '\u2022\u20221234',
    balance: 8420.17,
  },
  {
    id: 'sav-5678',
    type: 'savings',
    nickname: 'Advantage Savings',
    maskedNumber: '\u2022\u20225678',
    balance: 24230.55,
  },
];

export const CREDIT_CARD: CreditCardAccount = {
  id: 'card-9012',
  type: 'credit-card',
  nickname: 'Customized Cash Rewards',
  maskedNumber: '\u2022\u20229012',
  balance: 1248.23,
  availableCredit: 8751.77,
  minimumPayment: 45.0,
  paymentDueDate: 'Aug 28',
};
