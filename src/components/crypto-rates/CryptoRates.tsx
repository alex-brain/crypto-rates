import React, {useCallback, useEffect, useState} from 'react';
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import CryptoInput from "../crypto-input/CryptoInput";
import {CryptoInputIndex, CryptoInputField, CryptoInputs, Currency} from "../../types/crypto";
import {useCryptoRates} from "../../hooks/useCryptoRates";

const StyledImg = styled('img')(() => ({
  cursor: 'pointer'
}));

const CryptoRates = () => {
  const [cryptoInputs, setCryptoInputs] = useState<CryptoInputs>({
    left: {
      amount: '1',
      currency: Currency.BTC
    },
    right: {
      amount: '',
      currency: Currency.USDT
    }
  });

  const {getCryptoRates, rateData} = useCryptoRates(cryptoInputs);

  useEffect(() => {
    if (rateData) {
      setCryptoInputs(rateData.data);
    }
  }, [rateData]);

  useEffect(() => {
    const getInitialRates = async () => {
      await getCryptoRates({
        from: cryptoInputs.left.currency,
        to: cryptoInputs.right.currency,
        index: CryptoInputIndex.left,
        amount: cryptoInputs.left.amount
      });
    }

    getInitialRates();
  }, []);

  const onChangeCryptoInput = useCallback(async (index: CryptoInputIndex, field: string, value: string) => {

    let updatedCryptoInputs: CryptoInputs = {...cryptoInputs};

    if (field === CryptoInputField.currency) {
      if (
        (index === CryptoInputIndex.left && value === cryptoInputs.right.currency)
        || (index === CryptoInputIndex.right && value === cryptoInputs.left.currency)
      ) {
        onClickReplaceCurrencies();
      } else {
        setCryptoInputs((prevState) => {
          updatedCryptoInputs = {
            ...prevState,
            [index]: {
              ...prevState[index],
              [field]: value
            }
          };
          return updatedCryptoInputs;
        });

        getCryptoRates({
          from: updatedCryptoInputs.left.currency,
          to: updatedCryptoInputs.right.currency,
          index: CryptoInputIndex.left,
          amount: updatedCryptoInputs.left.amount
        });
      }
    }

    if (field === CryptoInputField.amount) {
      setCryptoInputs((prevState) => {
        updatedCryptoInputs = {
          ...prevState,
          [index]: {
            ...prevState[index],
            [field]: value
          }
        };
        return updatedCryptoInputs;
      });

      getCryptoRates({
        from: updatedCryptoInputs.left.currency,
        to: updatedCryptoInputs.right.currency,
        index,
        amount: value
      });
    }
  }, [cryptoInputs]);

  const onClickReplaceCurrencies = useCallback(async () => {
    let updatedCryptoInputs: CryptoInputs = {...cryptoInputs};
    setCryptoInputs((prevState => {
      updatedCryptoInputs = {
        left: {
          ...prevState.left,
          currency: prevState.right.currency
        },
        right: {
          ...prevState.right,
          currency: prevState.left.currency
        }
      };
      return updatedCryptoInputs
    }));
    getCryptoRates({
      from: updatedCryptoInputs.left.currency,
      to: updatedCryptoInputs.right.currency,
      amount: updatedCryptoInputs.left.amount
    })
  }, [cryptoInputs]);

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <CryptoInput
        index={CryptoInputIndex.left}
        amount={cryptoInputs.left.amount}
        currency={cryptoInputs.left.currency}
        onChangeCryptoInput={onChangeCryptoInput}
      />
      <StyledImg
        onClick={onClickReplaceCurrencies}
        src={process.env.PUBLIC_URL + `/icons/arrows.svg`}
        width={25}
        height={25}
        alt="arrows"
      />
      <CryptoInput
        index={CryptoInputIndex.right}
        amount={cryptoInputs.right.amount}
        currency={cryptoInputs.right.currency}
        onChangeCryptoInput={onChangeCryptoInput}
      />
    </Stack>
  );
};

export default CryptoRates;