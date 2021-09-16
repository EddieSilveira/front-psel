import React, { createContext, useState } from 'react';
import { BACKEND } from '../constants';
import { useHistory } from 'react-router-dom';
import useForm from '../Hooks/useForm';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [erro, setErro] = useState(null);
  const history = useHistory();

  async function signUp(objReq) {
    let url = `${BACKEND}/signup`;

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objReq),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) {
          localStorage.setItem('token', JSON.stringify(data.token));
          setAuthenticated(true);
          setToken(data.token);
          history.push('/dashboard');
        } else {
          setErro(data.erro.message);
          alert('Login inválido!');
        }
      });
  }

  async function signIn(dataForm) {
    const url = `${BACKEND}/signin`;

    await fetch(url, {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) {
          console.log(data);
          localStorage.setItem('token', JSON.stringify(data.token));
          setAuthenticated(true);
          setToken(data.token);
          history.push('/dashboard');
        } else {
          alert('Login inválido!');
        }
      })
      .catch(function (error) {
        console.error(`Houve um problema ao fazer o login ${error.message}`);
        setErro('Login Inválido!');
      });
  }

  async function signOut() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    setToken(null);
    history.push('/signin');
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, signUp, signIn, signOut, erro, token, useForm }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
