import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import Input from '../components/Form/Input';
import Botao from '../components/Form/Botao';
import useForm from '../Hooks/useForm';
import { Grid, FormControl, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundImage: 'linear-gradient(120deg, #125D98, #F5A962)',
    height: '100vh',
    flexGrow: 1,
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
        <Grid item xs={6}>
          <FormControl onSubmit={(e) => handleSubmit(e)}>
            <Box>
              <h1>Login</h1>
            </Box>

            <Input label="Email ou CPF" type="text" name="login" {...login} />
            <Input label="Senha" type="password" name="senha" {...senha} />
            <Botao>Login</Botao>
            {erro && <span>{erro}</span>}
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
