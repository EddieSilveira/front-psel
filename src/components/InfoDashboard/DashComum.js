import React, { useState } from 'react';
import { Grid, Box, Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../Modal';

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
    justifyContent: 'flex-start',
    padding: '8px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
  },
}));

const DashComum = ({ user }) => {
  const classes = useStyles();
  // let date = null;
  const date = new Date(user.createdAt);
  return (
    <Box className={classes.info}>
      <Typography variant="subtitle1">Email: {user.email}</Typography>
      <Typography variant="subtitle1">Cpf: {user.cpf}</Typography>
      <Typography variant="subtitle1">
        Cadastrado desde: {date.toUTCString()}
      </Typography>
      <Modal objUsuario={user} />
    </Box>
  );
};

export default DashComum;
