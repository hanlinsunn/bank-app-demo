export interface Transaction {
  id: string;
  accountId: string;
  postedOn: string;
  description: string;
  amount: number;
}

export interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

export interface TransferReceipt {
  confirmationNumber: string;
  submittedAt: string;
  request: TransferRequest;
}

export interface CardPaymentRequest {
  cardId: string;
  fromAccountId: string;
  amount: number;
}

export interface CardPaymentReceipt {
  confirmationNumber: string;
  submittedAt: string;
  request: CardPaymentRequest;
}

export interface MarketSummary {
  asOf: string;
  indicators: MarketIndicator[];
}

export interface MarketIndicator {
  label: string;
  value: string;
  changePercent: number;
}
