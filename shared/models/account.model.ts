export type AccountType = 'checking' | 'savings' | 'credit-card';

export interface Account {
  id: string;
  type: AccountType;
  nickname: string;
  maskedNumber: string;
  balance: number;
}

export interface CreditCardAccount extends Account {
  type: 'credit-card';
  availableCredit: number;
  minimumPayment: number;
  paymentDueDate: string;
}
