export enum Currency {
  USDT = 'USDT',
  BTC = 'BTC',
  ETH = 'ETH'
}

export interface CryptoInputState {
  amount: string;
  currency: Currency;
}

export enum CryptoInputField {
  amount = 'amount',
  currency = 'currency',
}

export enum CryptoInputIndex {
  left = 'left',
  right = 'right'
}

export interface CryptoInputs {
  left: CryptoInputState;
  right: CryptoInputState;
}