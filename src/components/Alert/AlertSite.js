import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function AlertSite({ message }) {
  return (
    <Stack
      sx={{
        width: '100%',
      }}
      spacing={2}
    >
      <Alert
        severity="error"
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}
      >
        <AlertTitle>Erro!</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
}
