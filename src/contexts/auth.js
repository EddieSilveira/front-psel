import React, { createContext, useState } from 'react';
import { BACKEND } from '../constants';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const history = useHistory();

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
        console.error(`Houve um porblema ao fazer o login ${error.message}`);
      });
  }

  async function signOut() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    setToken(null);
    history.push('/signin');
  }

  return (
    <AuthContext.Provider value={{ authenticated, signIn, signOut, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
