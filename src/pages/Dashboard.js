import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../contexts/auth';
import { Grid, Box, Avatar, Typography, Button } from '@material-ui/core';
import { BACKEND } from '../constants';
import { useMediaQuery } from '@material-ui/core/';

import InfoDashboard from '../components/InfoDashboard/Index';
import DashComum from '../components/InfoDashboard/DashComum';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sidebar: {
    backgroundColor: '#125D98',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    height: '100px',
    width: '100px',
    marginTop: '80px',
  },
  principal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
  boxBtnSideBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSideBar: {
    color: '#125D98',
    fontWeight: 'bold',
    padding: '16px',
    width: '100%',
    height: '20%',
    marginBottom: '12px',
  },
}));

const Dashboard = () => {
  const { signOut } = useContext(AuthContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [objUsuario, setObjUsuario] = useState({});
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listarUsuarios, setListarUsuarios] = useState(false);
  const [perfil, setPerfil] = useState(true);
  const [table, setTable] = useState(false);
  let url = `${BACKEND}/usuarios/`;
  const isActive = useMediaQuery('(max-width: 600px)');
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
            if (user.nivelAcesso === 999) {
              setListarUsuarios(true);
            }
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

  if (loading) return <h1>CARREGANDO...</h1>;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          className={classes.sidebar}
          style={!isActive ? { height: '99vh' } : { height: '400px' }}
        >
          <Avatar
            className={classes.avatar}
            alt="foto-usuario"
            src={`${BACKEND}/${objUsuario.user.foto.path
              .replace('public/', 'files/')
              .replace('uploads/', '')}`}
          />
          <Box className={classes.boxBtnSideBar}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.btnSideBar}
              onClick={() => {
                setTable(false);
                setPerfil(true);
              }}
            >
              <PersonIcon />
              &nbsp; Perfil
            </Button>
            {listarUsuarios && (
              <Button
                variant="contained"
                color="secondary"
                className={classes.btnSideBar}
                onClick={() => {
                  setTable(true);
                  setPerfil(false);
                }}
              >
                <ListIcon />
                &nbsp;Usuários
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              className={classes.btnSideBar}
              onClick={handleLogout}
            >
              <ExitToAppIcon />
              &nbsp; Logout
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9} lg={10} className={classes.principal}>
          <Typography
            variant={!isActive ? 'h3' : 'h4'}
            style={{ marginTop: '70px' }}
          >
            Olá, {objUsuario.user.nome}!
          </Typography>
          {perfil && <DashComum user={objUsuario.user} />}
          {table && (
            <InfoDashboard
              objUsuario={objUsuario}
              listaUsuarios={listaUsuarios}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default Dashboard;
