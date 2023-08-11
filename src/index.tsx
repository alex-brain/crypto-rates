import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import theme from "./theme";
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </React.StrictMode>
);
