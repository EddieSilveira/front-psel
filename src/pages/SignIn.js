import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import Input from '../components/Form/Input';
import Botao from '../components/Form/Botao';
import useForm from '../Hooks/useForm';
import { Grid, FormControl, Typography, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';

import AlertSite from '../components/Alert/AlertSite';

const useStyles = makeStyles({
  root: {
    backgroundImage: 'linear-gradient(150deg, #125D98, #F5A962)',
    height: '100vh',
    flexGrow: 1,
  },
  paper: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#125D98',
  },
  containerCadastro: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '24px',

    '& a': {
      color: '#F5A962',
      fontSize: '18px',
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:hover': {
        color: '#125D98',
        fontSize: '22px',
      },
    },
  },
  wrapperInput: {
    display: 'flex',
    alignItems: 'center',
  },
  iconsInput: {
    color: '#125D98',
    marginTop: '28px',
  },
});

const SignIn = () => {
  const { authenticated, signIn, erro } = useContext(AuthContext);
  const classes = useStyles();
  let objReq = {
    login: '',
    senha: '',
  };
  const login = useForm();
  const senha = useForm();

  useEffect(() => {
    document.title = 'Login';
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    objReq.login = login.value;
    objReq.senha = senha.value;

    if (login.error === null && senha.error === null) {
      signIn(objReq);
    } else {
      alert('Todos os campos devem ser preenchidos corretamente!');
    }
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        className={classes.root}
        alignContent="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={9} md={6}>
          {erro && <AlertSite message={erro} />}
          <Paper elevation={10} className={classes.paper}>
            <Box className={classes.title}>
              <Typography variant="h4">Bem vindos de volta!</Typography>
            </Box>
            <FormControl>
              <Box className={classes.wrapperInput}>
                <PersonIcon className={classes.iconsInput} />
                <Input
                  label="Email ou CPF"
                  type="text"
                  name="login"
                  {...login}
                />
              </Box>
              <Box className={classes.wrapperInput}>
                <LockIcon className={classes.iconsInput} />
                <Input label="Senha" type="password" name="senha" {...senha} />
              </Box>
              <Botao
                onClick={(e) => handleSubmit(e)}
                style={{
                  marginTop: '24px',
                  padding: '8px',
                  fontSize: '16px',
                  color: '#F5A962',
                  fontWeight: 'bold',
                }}
              >
                Login
              </Botao>
              <Box className={classes.containerCadastro}>
                <a href="/signup">Cadastre-se</a>
              </Box>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
