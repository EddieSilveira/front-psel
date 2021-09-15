import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/auth';

const SignIn = () => {
  const [dataForm, setDataForm] = useState({
    login: '',
    senha: '',
  });
  const inputLogin = useRef(null);
  const inputSenha = useRef(null);

  const { authenticated, signIn } = useContext(AuthContext);

  async function handleChange(e) {
    const { name, value } = e.target;
    await setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'login') {
      inputLogin.current.focus();
    }
    if (name === 'senha') {
      inputSenha.current.focus();
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    console.log(dataForm);
    signIn(dataForm);
  }
  return (
    <>
      <form onSubmit={handleClick}>
        <label>Login</label>
        <input onChange={handleChange} name="login" ref={inputLogin} />
        <label>Senha</label>
        <input onChange={handleChange} name="senha" ref={inputSenha} />
        <button>Login</button>
      </form>
      <a href="/signup">
        &nbsp;<button>Cadastre-se</button>
      </a>
    </>
  );
};

export default SignIn;
