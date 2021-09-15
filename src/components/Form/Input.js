import React from 'react';

const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      ></input>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
