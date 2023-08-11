import * as React from 'react';
import {styled} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {default as MaterialSelect} from '@mui/material/Select';
import {Box} from "@mui/material";
import InputBase from '@mui/material/InputBase';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {Currency} from "../../types/crypto";

const BootstrapInput = styled(InputBase)(({theme}) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const StyledSelect = styled(MaterialSelect)(() => ({
  '& .MuiFormControl-root': {
    margin: 0,
  },
  '& .MuiSelect-select': {
    height: '35px !important',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    padding: 0,
    minHeight: '56px !important',
    paddingLeft: '10px'
  },
}))

const StyledFormControl = styled(FormControl)(() => ({
  '& .MuiInputBase-root': {
    height: '56px',
    padding: 0,

    '& .MuiInputBase-input:focus': {
      outline: 'none',
      boxShadow: 'none',
      borderLeft: '1px solid #ced4da',
      background: '#FFF'
    }
  },
}))

const StyledBox = styled(Box)(() => ({
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center'
}));

interface SelectOption {
  value: string;
  title: string;
}

interface SelectProps {
  value: string;
  onChangeSelect: (event: { target: { value: string } }) => void;
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({
                                         value,
                                         onChangeSelect,
                                         options
                                       }) => {
  const handleChange = (event: any) => {
    onChangeSelect(event);
  };
  return (
    <div>
      <StyledFormControl variant="standard">
        <StyledSelect
          IconComponent={UnfoldMoreIcon}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={value}
          onChange={handleChange}
          input={<BootstrapInput/>}
          renderValue={(value) => {
            const selectedCurrency = value as Currency;
            return (
              <>
                <StyledBox mt={1}>
                  <img src={process.env.PUBLIC_URL + `/icons/${Currency[selectedCurrency]}.svg`} width={25}
                       height={25}/>
                </StyledBox>
                <StyledBox>{value as string}</StyledBox>
              </>
            )
          }}
        >
          {options.map((option) => (
            <MenuItem value={option.value} key={option.value}>{option.title}</MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </div>
  );
};

export default Select;
