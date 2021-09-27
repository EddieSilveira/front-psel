import React from 'react';
import Button from '@material-ui/core/Button';

const Botao = ({ children, ...props }) => {
  return (
    <Button
      style={{ marginTop: '32px', color: '#F5A962' }}
      variant="contained"
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
};

export default Botao;
