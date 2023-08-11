import {useEffect, useState} from "react";
import {CryptoRateResData, fetchCryptoRates} from "../services/crypto";
import {CryptoInputIndex, CryptoInputs, Currency} from "../types/crypto";
import {normalizeDisplayNumber} from "../utils/numbers";

let timer: ReturnType<typeof setTimeout>;

interface CryptoRates {
  isFetching: boolean;
  data: CryptoInputs;
}

interface GetCryptoRates {
  from: Currency;
  to: Currency;
  index?: CryptoInputIndex;
  amount: string;
}

export const useCryptoRates = (cryptoInputs: CryptoInputs) => {
  const [rateData, setRateData] = useState<CryptoRates | null>(null);

  useEffect(() => {
    setRateData({
      isFetching: false,
      data: cryptoInputs
    });
  }, []);

  const getCryptoRates = async ({from, to, index = CryptoInputIndex.left, amount}: GetCryptoRates) => {
    window.clearTimeout(timer);
    timer = setTimeout(async () => {
      let data: CryptoRateResData | undefined
      if (index === CryptoInputIndex.left) {
        data = await fetchCryptoRates({
          from,
          to,
        });

        if (data) {
          setRateData({
            isFetching: false,
            data: {
              left: {
                amount,
                currency: from
              },
              right: {
                currency: to,
                amount: normalizeDisplayNumber(data?.rate || 1, amount)
              }
            }
          });
        }
      } else {
        data = await fetchCryptoRates({
          from: to,
          to: from,
        });

        if (data) {
          setRateData({
            isFetching: false,
            data: {
              left: {
                amount: normalizeDisplayNumber(data?.rate || 1, amount),
                currency: from
              },
              right: {
                currency: to,
                amount
              }
            }
          });
        }
      }
    }, 300);
  };

  return {
    rateData,
    getCryptoRates
  };
};