import React from 'react';
import { TextField } from '@material-ui/core';

const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div style={{ marginTop: '16px', marginLeft: '8px', flex: '1' }}>
      <TextField
        id={name}
        name={name}
        type={type}
        label={label}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        helperText={error && `${error}`}
        fullWidth
        color="secondary"
        placeholder={`Insira ${label}`}
      ></TextField>
    </div>
  );
};

export default Input;
