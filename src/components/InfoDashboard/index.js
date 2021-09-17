import React, { useState } from 'react';
import { Grid, Box, Avatar, Typography, Button } from '@material-ui/core';
import Modal from '../../components/Modal';
import Table from '../../components/Table/Table';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sidebar: {
    backgroundColor: '#125D98',
    margin: 0,
    height: '100vh',
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
    justifyContent: 'space-around',
    padding: '8px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
}));

const InfoDashboard = ({ objUsuario, date, listaUsuarios }) => {
  const [admin, setAdmin] = useState(false);
  const classes = useStyles();

  if (objUsuario.user.nivelAcesso === 999) setAdmin(true);
  return (
    <div>
      <Box className={classes.info}>
        <Typography variant="subtitle1">
          Email: {objUsuario.user.email}
        </Typography>
        <Typography variant="subtitle1">Cpf: {objUsuario.user.cpf}</Typography>
        <Typography variant="subtitle1">
          Cadastrado desde: {date.toUTCString()}
        </Typography>
        <Modal objUsuario={objUsuario} />
      </Box>
    </div>
  );
};

export default InfoDashboard;
