import React from 'react';
import Button from '@material-ui/core/Button';

const Botao = ({ children, ...props }) => {
  return (
    <Button
      style={{ marginTop: '32px' }}
      variant="contained"
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
};

export default Botao;
