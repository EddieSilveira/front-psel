import React from 'react';
import Table from '../Table/Table';

const DashAdmin = ({ user, listaUsuarios }) => {
  return (
    <div>
      <Table listaUsuarios={listaUsuarios} />
    </div>
  );
};

export default DashAdmin;
