import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import Input from '../Form/Input';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function FormDialog({ objUsuario, open, setOpen, loading }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { editUser, erro, useForm } = useContext(AuthContext);
  const nome = useForm();
  const cpf = useForm('cpf');
  const email = useForm('email');
  const password = useForm();
  const image = useForm();

  useEffect(() => {
    document.title = 'Dashboard - Admin';
  }, []);

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
      editUser(objReq);
      handleClose();
    } else {
      alert('Todos os campos devem ser preenchidos corretamente!');
      handleClose();
    }
  }
  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar informações</DialogTitle>
        <DialogContent>
          <DialogContentText>Edite os seus dados aqui!</DialogContentText>
          <Input
            label="Nome Completo"
            type="text"
            name="nome"
            {...nome}
            value={objUsuario ? objUsuario[0].nome : 'Nome Completo'}
          />
          <Input
            label="Cpf"
            type="text"
            name="cpf"
            {...cpf}
            value={objUsuario ? objUsuario[0].cpf : 'CPF'}
          />
          <Input
            label="Email"
            type="text"
            name="email"
            {...email}
            value={objUsuario ? objUsuario[0].email : 'Email'}
          />
          <Input label="Senha" type="password" name="password" {...password} />
          <Input label="Foto de Perfil" type="file" name="image" {...image} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            <SaveIcon />
            &nbsp; Salvar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            <CloseIcon />
            &nbsp;Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}