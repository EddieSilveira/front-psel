import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import Input from '../components/Form/Input';
import Botao from '../components/Form/Botao';
import useForm from '../Hooks/useForm';
import { Grid, FormControl, Typography, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

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
        <Grid item xs={12} md={6}>
          <Paper elevation={10} className={classes.paper}>
            <Box className={classes.title}>
              <Typography variant="h4">Bem vindo de volta!</Typography>
            </Box>
            <FormControl>
              <Input label="Email ou CPF" type="text" name="login" {...login} />
              <Input label="Senha" type="password" name="senha" {...senha} />
              <Botao onClick={(e) => handleSubmit(e)}>Login</Botao>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
