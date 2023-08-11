import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from "../../ui/select/Select";
import {styled} from "@mui/material/styles";
import {NumericFormat} from "react-number-format";
import {Currency} from "../../types/crypto";
import { CryptoInputIndex } from '../../types/crypto';
import {useCallback} from "react";

const StyledFormControl = styled(FormControl)(() => ({
  '& .MuiInputBase-root': {
    height: '56px',
    padding: 0,

    '& .MuiInputBase-input': {
      paddingRight: '16px'
    }
  }
}))

const NumericFormatCustom = React.forwardRef(
  function NumericFormatCustom(props, ref) {
    const {...other} = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        thousandsGroupStyle="thousand"
        thousandSeparator=" "
        decimalSeparator=","
      />
    );
  },
);

interface CryptoInputProps {
  amount: string;
  currency: Currency;
  index: CryptoInputIndex;
  onChangeCryptoInput: (index: CryptoInputIndex, field: string, value: string) => void
}

const cryptoOptions = [
  {
    title: Currency.USDT,
    value: Currency.USDT
  },
  {
    title: Currency.BTC,
    value: Currency.BTC
  },
  {
    title: Currency.ETH,
    value: Currency.ETH
  }
]

const CryptoInput: React.FC<CryptoInputProps> = ({
                                                   amount,
                                                   currency,
                                                   index,
                                                   onChangeCryptoInput
                                                 }) => {

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeCryptoInput(index, 'amount', event.target.value);
  }, [index, onChangeCryptoInput]);

  const onChangeSelect = useCallback((event: { target: { value: string } }) => {
    onChangeCryptoInput(index, 'currency', event.target.value);
  }, [index, onChangeCryptoInput]);

  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', marginTop: '20px'}}>
      <div>
        <StyledFormControl variant="outlined">
          <OutlinedInput
            value={amount.replace('.', ',')}
            onChange={onChangeInput}
            id="outlined-adornment-password"
            inputComponent={NumericFormatCustom as any}
            inputProps={{
              style: {textAlign: 'right'},
            }}
            endAdornment={
              <InputAdornment sx={{margin: 0}} position="end">
                <Select
                  value={currency}
                  onChangeSelect={onChangeSelect}
                  options={cryptoOptions}
                />
              </InputAdornment>
            }
          />
        </StyledFormControl>
      </div>
    </Box>
  );
};

export default CryptoInput;
