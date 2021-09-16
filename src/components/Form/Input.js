import React from 'react';
import { TextField, FormLabel } from '@material-ui/core';

const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <TextField
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      ></TextField>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
