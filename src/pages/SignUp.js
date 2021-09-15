import React from 'react';

import Input from '../components/Form/Input';
import Button from '../components/Form/Button';
import useForm from '../Hooks/useForm';
import { BACKEND } from '../constants';

const SignUp = () => {
  const nome = useForm();
  const cpf = useForm('cpf');
  const email = useForm('email');
  const password = useForm();
  const image = useForm();

  async function handleSubmit(e) {
    const [objReq, setObjReq] = {
      nome: '',
      cpf: '',
      email: '',
      password: '',
      foto: {
        path: '',
        originalName: '',
        size: '',
        mimeType: '',
      },
    };

    e.preventDefault();
    if (
      nome.error === null &&
      cpf.error === null &&
      email.error === null &&
      password.error === null
    ) {
      setObjReq({
        nome: nome.value,
        cpf: cpf.value,
        email: email.value,
        password: password.value,
        foto: {
          path: '',
          originalName: '',
          size: '',
          mimeType: '',
        },
      });

      let url = `${BACKEND}/usuarios/`;

      await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
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
      <Button>Cadastrar</Button>
    </form>
  );
};

export default SignUp;
