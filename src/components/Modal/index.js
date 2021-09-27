import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';

import Input from '../../components/Form/Input';
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

export default function FormDialog({ objUsuario }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { editUser, erro, useForm } = useContext(AuthContext);
  const nome = useForm('', objUsuario, 'edit', 'nome');
  const cpf = useForm('cpf', objUsuario, 'edit', 'cpf');
  const email = useForm('email', objUsuario, 'edit', 'email');
  const password = useForm('', objUsuario, 'edit', 'password');
  const image = useForm('', objUsuario, 'edit', 'image');

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      nome.error === null &&
      cpf.error === null &&
      email.error === null &&
      password.error === null
    ) {
      const objReq = {
        _id: objUsuario._id,
        nome: nome.value ? nome.value : objUsuario.nome,
        cpf: cpf.value ? cpf.value : objUsuario.cpf,
        email: email.value ? email.value : objUsuario.email,
        senha: password.value ? password.value : objUsuario.senha,
        nivelAcesso: 1,
        foto: {
          originalName: image.picture
            ? image.picture.originalName
            : objUsuario.foto.originalName,
          path: image.picture ? image.picture.path : objUsuario.foto.path,
          size: image.picture ? image.picture.size : objUsuario.foto.size,
          mimetype: image.picture
            ? image.picture.mimeType
            : objUsuario.foto.mimetype,
        },
      };
      editUser(objReq);

      handleClose();
    } else {
      alert('Todos os campos devem ser preenchidos corretamente!');
      handleClose();
    }
  }
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        style={{ color: '#125D98', fontWeight: 'bold' }}
      >
        <EditIcon />
        &nbsp;Editar Perfil
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar informações</DialogTitle>
        <DialogContent>
          <DialogContentText>Edite os seus dados aqui!</DialogContentText>
          <Input
            label="Nome Completo"
            type="text"
            name="nome"
            objUsuario={objUsuario}
            {...nome}
          />
          <Input label="Cpf" type="text" name="cpf" {...cpf} />
          <Input label="Email" type="text" name="email" {...email} />
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
