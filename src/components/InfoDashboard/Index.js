import React from 'react';
import DashAdmin from './DashAdmin';
import DashComum from './DashComum';

function getDashboard(objUser, listaUsuarios) {
  const { user } = objUser;
  if (user) {
    if (user.nivelAcesso === 1) {
      return <DashComum user={user} />;
    } else if (user.nivelAcesso === 999) {
      return <DashAdmin user={user} listaUsuarios={listaUsuarios} />;
    }
  }
}

const Index = ({ objUsuario, listaUsuarios }) => {
  return <div>{getDashboard(objUsuario, listaUsuarios)}</div>;
};

export default Index;
