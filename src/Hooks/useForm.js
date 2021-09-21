import { useState, useEffect } from 'react';
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

const useForm = (type, objUsuario, screen, nameInput) => {
  const [value, setValue] = useState('');

  const [picture, setPicture] = useState({
    path: '',
    originalName: '',
    size: '',
    mimeType: '',
  });

  useEffect(() => {
    if (screen === 'edit') {
      switch (nameInput) {
        case 'nome':
          setValue(objUsuario.nome);
          break;
        case 'cpf':
          setValue(objUsuario.cpf);
          break;
        case 'email':
          setValue(objUsuario.email);
          break;
      }
    }
  }, []);

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

    const imageResponse = await fetch(url, {
      method: 'POST',
      body: data,
    }).then((response) => response.json());

    setPicture({
      path: imageResponse.file.path,
      originalName: imageResponse.file.originalname,
      size: imageResponse.file.size,
      mimeType: imageResponse.file.mimetype,
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
    picture,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
