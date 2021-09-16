import React from 'react';
import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#125D98',
    },
    secondary: {
      main: '#F5A962',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
