import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import Input from '../components/Form/Input';
import Botao from '../components/Form/Botao';
import { BACKEND } from '../constants';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const { authenticated, signUp, erro, useForm } = useContext(AuthContext);
  const nome = useForm();
  const cpf = useForm('cpf');
  const email = useForm('email');
  const password = useForm();
  const image = useForm();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      nome.error === null &&
      cpf.error === null &&
      email.error === null &&
      password.error === null
    ) {
      const objReq = {
        nome: nome.value,
        cpf: cpf.value,
        email: email.value,
        senha: password.value,
        nivelAcesso: 1,
        foto: {
          originalName: image.picture.originalName,
          path: image.picture.path,
          size: image.picture.size,
          mimetype: image.picture.mimeType,
        },
      };
      signUp(objReq);
    } else {
      alert('Todos os campos devem ser preenchidos corretamente!');
    }
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Cadastre-se</h1>
      <Input label="Nome Completo" type="text" name="nome" {...nome} />
      <Input label="Cpf" type="text" name="nome" {...cpf} />
      <Input label="Email" type="text" name="email" {...email} />
      <Input label="Senha" type="password" name="password" {...password} />
      <Input label="Foto de Perfil" type="file" name="image" {...image} />
      <Botao>Cadastrar</Botao>
      {erro && <span>{erro}</span>}
    </form>
  );
};

export default SignUp;
