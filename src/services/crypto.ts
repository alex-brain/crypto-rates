import {get} from "../api";
import {Currency} from "../types/crypto";

export interface CryptoRatesReqData {
  from: Currency;
  to: Currency;
}

export interface CryptoRateResData {
  success: boolean;
  errorMessage?: string;
  rate: number;
}

export const fetchCryptoRates = async ({ from, to }: CryptoRatesReqData): Promise<CryptoRateResData> => {
  try {
    const res = await get(`/exchangerate/${from}/${to}`);
    return {
      success: true,
      rate: res.data.rate
    };
  } catch (e) {
    return {
      success: false,
      errorMessage: 'Something went wrong',
      rate: 0
    }
  }
}