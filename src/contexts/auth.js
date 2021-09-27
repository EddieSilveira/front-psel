import React, { createContext, useState } from 'react';
import { BACKEND } from '../constants';
import { useHistory } from 'react-router-dom';
import useForm from '../Hooks/useForm';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [nivelAcesso, setNivelAcesso] = useState({});
  const [token, setToken] = useState(null);
  const [erro, setErro] = useState(null);
  const history = useHistory();

  async function accessAuthorization(token) {
    const jwtDecode = (t) => {
      let token = {};
      token.raw = t;
      token.header = JSON.parse(window.atob(t.split('.')[0]));
      token.payload = JSON.parse(window.atob(t.split('.')[1]));
      return token;
    };
    const idUsuario = jwtDecode(token).payload.id;

    let url = `${BACKEND}/usuarios/`;

    await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user) => {
          if (user._id === idUsuario) {
            setNivelAcesso((prevState) => ({
              ...prevState,
              nivelAcesso: user.nivelAcesso,
            }));
          }
        });
      });
  }

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
          setErro(false);
          history.push('/dashboard');
        } else {
          setErro(
            'Preencha os dados corretamente, não foi possível fazer o cadastro!',
          );
        }
      });
  }

  async function adminAddUser(objReq) {
    let url = `${BACKEND}/usuarios/`;
    let token = localStorage.getItem('token').replace('"', '').replace('"', '');

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objReq),
    })
      .then((response) => response.json())
      .then((data) => {});
  }

  async function editUser(objReq) {
    let url = `${BACKEND}/usuarios/`;
    let token = localStorage.getItem('token').replace('"', '').replace('"', '');
    //Ajustar
    await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objReq),
    })
      .then((response) => response.json())
      .then((data) => {});
  }

  async function signIn(dataForm) {
    const url = `${BACKEND}/signin`;
    if (!dataForm.login || !dataForm.senha) {
      setErro('Preencha corretamente os campos!');
      return false;
    }

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
          localStorage.setItem('token', JSON.stringify(data.token));
          setAuthenticated(true);
          setToken(data.token);
          setErro(false);
          accessAuthorization(data.token);
          history.push('/dashboard');
        } else {
          setErro(data.message);
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
      value={{
        authenticated,
        nivelAcesso,
        adminAddUser,
        signUp,
        signIn,
        editUser,
        signOut,
        erro,
        token,
        useForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
