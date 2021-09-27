import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../Modal';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    borderTop: '3px solid #125D98',
  },
  wrapperInfo: {
    width: '80%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '8px 0',
  },
  destaqueInfo: {
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: 1.4,
    color: '#125D98',
    margin: '0 8px',
  },
  itemInfo: {
    fontSize: '16px',
    lineHeight: 1.4,
    fontWeight: 'bold',
    margin: '0 8px',
  },
}));

const DashComum = ({ user }) => {
  const classes = useStyles();

  function dataCadastro() {
    let date = new Date(user.createdAt);
    let dia = date.getDate().toString().padStart(2, '0');
    let mes = (date.getMonth() + 1).toString().padStart(2, '0');
    let ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <Box className={classes.info}>
      <Box className={classes.wrapperInfo}>
        <EmailIcon className={classes.destaqueInfo} />
        <Typography variant="body1" className={classes.destaqueInfo}>
          Email:
        </Typography>
        <Typography variant="body1" className={classes.itemInfo}>
          {user.email}
        </Typography>
      </Box>
      <Box className={classes.wrapperInfo}>
        <AssignmentIndIcon className={classes.destaqueInfo} />
        <Typography variant="body1" className={classes.destaqueInfo}>
          Cpf:
        </Typography>
        <Typography variant="body1" className={classes.itemInfo}>
          {user.cpf}
        </Typography>
      </Box>
      <Box className={classes.wrapperInfo}>
        <EventNoteIcon className={classes.destaqueInfo} />
        <Typography variant="body1" className={classes.destaqueInfo}>
          Cadastrado desde:
        </Typography>
        <Typography variant="body1" className={classes.itemInfo}>
          {dataCadastro()}
        </Typography>
      </Box>
      <Modal objUsuario={user} />
    </Box>
  );
};

export default DashComum;
