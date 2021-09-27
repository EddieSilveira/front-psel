import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import Input from '../components/Form/Input';
import Botao from '../components/Form/Botao';
import { BACKEND } from '../constants';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, Typography, Box, Paper } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
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
  },
  btnSignUp: {
    padding: '12px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  wrapperInput: {
    display: 'flex',
    alignItems: 'center',
  },
  iconsInput: {
    color: '#125D98',
    marginTop: '28px',
  },
  btnLogin: {
    color: '#F5A962',
    fontSize: '18px',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      color: '#125D98',
      fontSize: '22px',
    },
  },
});

const SignUp = () => {
  const { authenticated, signUp, erro, useForm } = useContext(AuthContext);
  const nome = useForm('', {}, 'signup');
  const cpf = useForm('cpf', {}, 'signup');
  const email = useForm('email', {}, 'signup');
  const password = useForm('', {}, 'signup');
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
        <Grid item xs={12} sm={9} md={6}>
          {erro && <AlertSite message={erro} />}
          <Paper elevation={10} className={classes.paper}>
            <Box className={classes.title}>
              <Typography variant="h4" style={{ color: '#125D98' }}>
                Seja bem vindo!
              </Typography>
            </Box>
            <FormControl>
              <Box className={classes.wrapperInput}>
                <PersonIcon className={classes.iconsInput} />
                <Input
                  label="Nome Completo"
                  type="text"
                  name="nome"
                  {...nome}
                />
              </Box>
              <Box className={classes.wrapperInput}>
                <AssignmentIndIcon className={classes.iconsInput} />
                <Input label="Cpf" type="text" name="nome" {...cpf} />
              </Box>
              <Box className={classes.wrapperInput}>
                <EmailIcon className={classes.iconsInput} />
                <Input label="Email" type="text" name="email" {...email} />
              </Box>
              <Box className={classes.wrapperInput}>
                <LockIcon className={classes.iconsInput} />
                <Input
                  label="Senha"
                  type="password"
                  name="password"
                  {...password}
                />
              </Box>
              <Box className={classes.wrapperInput}>
                <AddAPhotoIcon className={classes.iconsInput} />
                <Input
                  label="Foto de Perfil"
                  type="file"
                  name="image"
                  {...image}
                />
              </Box>
              <Botao
                onClick={(e) => handleSubmit(e)}
                className={classes.btnSignUp}
              >
                Cadastrar
              </Botao>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '8px',
                }}
              >
                <a href="/signin" className={classes.btnLogin}>
                  Entrar
                </a>
              </Box>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
