import React, { useState } from 'react';
import { BACKEND } from '../constants/index';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido!',
  },
  cpf: {
    regex: /^\d{3}.?\d{3}.?\d{3}-?\d{2}$/,
    message: 'Preencha um CPF válido!',
  },
};

const useForm = (type) => {
  const [value, setValue] = useState('');
  const [picture, setPicture] = useState({
    path: '',
    originalName: '',
    size: '',
    mimeType: '',
  });

  const [error, setError] = useState(null);
  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }
  async function imageUpload(file) {
    let url = `${BACKEND}/upload`;
    const data = new FormData();
    data.append('file', file, file.name);

    await fetch(url, {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then(({ file }) => {
        setPicture({
          path: file.path,
          originalName: file.originalname,
          size: file.size,
          mimeType: file.mimetype,
        });
      });
  }
  function onChange({ target }) {
    if (target.files) {
      imageUpload(target.files[0]);
    }
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
