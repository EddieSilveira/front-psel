import React from 'react';

import Routes from './routes/Routes';
import { AuthProvider } from './contexts/auth';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './contexts/theme';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
