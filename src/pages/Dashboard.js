import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../contexts/auth';
import { Grid, Box, Avatar, Typography, Button } from '@material-ui/core';
import { BACKEND } from '../constants';

import InfoDashboard from '../components/InfoDashboard/Index';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sidebar: {
    backgroundColor: '#125D98',
    height: '99vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    height: '100px',
    width: '100px',
    marginTop: '24px',
  },
  principal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '8px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
}));

const Dashboard = () => {
  const { signOut } = useContext(AuthContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [objUsuario, setObjUsuario] = useState({});
  const [listaUsuarios, setListaUsuarios] = useState([]);
  let url = `${BACKEND}/usuarios/`;

  const jwtDecode = (t) => {
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return token;
  };

  useEffect(() => {
    let token = localStorage.getItem('token').replace('"', '').replace('"', '');
    const idUsuario = jwtDecode(token).payload.id;
    document.title = 'Dashboard';
    fetch(url, {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'x-access-token': token,
      },
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        setListaUsuarios(data);
        data.forEach((user) => {
          if (user._id === idUsuario) {
            setObjUsuario({
              user,
            });
            setLoading(false);
          }
        });
      });
  }, []);

  function handleLogout() {
    if (window.confirm('Você realmente deseja sair?')) {
      signOut();
    }
  }

  if (loading) return <h1>LOADING...</h1>;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={2} className={classes.sidebar}>
          <Avatar
            className={classes.avatar}
            alt="foto-usuario"
            src={`${BACKEND}/${objUsuario.user.foto.path}`}
          />

          <Button
            variant="contained"
            color="secondary"
            style={{ color: '#125D98', fontWeight: 'bold', padding: '12px' }}
            onClick={handleLogout}
          >
            Logout&nbsp;
            <ExitToAppIcon />
          </Button>
        </Grid>
        <Grid item xs={12} sm={9} md={10} className={classes.principal}>
          <Typography
            variant="h3"
            mt={2}
            style={{ marginTop: '48px', marginBottom: '48px' }}
          >
            Olá, {objUsuario.user.nome}!
          </Typography>
          <InfoDashboard
            objUsuario={objUsuario}
            listaUsuarios={listaUsuarios}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
