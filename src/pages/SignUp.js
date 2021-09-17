import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import Input from '../components/Form/Input';
import Botao from '../components/Form/Botao';
import { BACKEND } from '../constants';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, Typography, Box, Paper } from '@material-ui/core';

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

const SignUp = () => {
  const { authenticated, signUp, erro, useForm } = useContext(AuthContext);
  const nome = useForm();
  const cpf = useForm('cpf');
  const email = useForm('email');
  const password = useForm();
  const image = useForm();
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      nome.error === null &&
      cpf.error === null &&
      email.error === null &&
      password.error === null
    ) {
      const objReq = {
        nome: nome.value,
        cpf: cpf.value,
        email: email.value,
        senha: password.value,
        nivelAcesso: 1,
        foto: {
          originalName: image.picture.originalName,
          path: image.picture.path,
          size: image.picture.size,
          mimetype: image.picture.mimeType,
        },
      };
      signUp(objReq);
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
              <Typography variant="h4">Seja bem vindo!</Typography>
            </Box>
            <FormControl>
              <Input label="Nome Completo" type="text" name="nome" {...nome} />
              <Input label="Cpf" type="text" name="nome" {...cpf} />
              <Input label="Email" type="text" name="email" {...email} />
              <Input
                label="Senha"
                type="password"
                name="password"
                {...password}
              />
              <Input
                label="Foto de Perfil"
                type="file"
                name="image"
                {...image}
              />
              <Botao onClick={(e) => handleSubmit(e)}>Cadastrar</Botao>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
