import React, { useState, useContext } from 'react';
import MaterialTable from 'material-table';
import { AuthContext } from '../../contexts/auth';

function Table({ listaUsuarios }) {
  const [data, setData] = useState(listaUsuarios);

  const [loading, setLoading] = useState(true);
  const { editUser, adminAddUser } = useContext(AuthContext);

  const columns = [
    { title: 'Id', field: '_id', editable: false },
    { title: 'Nome', field: 'nome' },
    { title: 'Email', field: 'email' },
    { title: 'Cpf', field: 'cpf' },
    { title: 'Acesso', field: 'nivelAcesso' },
  ];

  async function updateUser(updatedRow) {
    const objReq = {
      _id: updatedRow._id,
      nome: updatedRow.nome,
      cpf: updatedRow.cpf,
      email: updatedRow.email,
      senha: updatedRow.senha,
      nivelAcesso: updatedRow.nivelAcesso,
      foto: {
        originalName: !updatedRow
          ? 'default.png'
          : updatedRow.foto.originalName,
        path: !updatedRow ? 'public/uploads/default.png' : updatedRow.foto.path,
        size: !updatedRow ? 2000 : updatedRow.foto.size,
        mimetype: !updatedRow ? 'image/png' : updatedRow.foto.mimetype,
      },
    };
    editUser(objReq);
    setLoading(true);
  }

  async function saveUser(newRow) {
    if (!newRow.nome && !newRow.cpf && !newRow.email && !newRow.nivelAcesso) {
      alert('Preencha os campos corretamente');
      return false;
    }

    const objReq = {
      nome: newRow.nome,
      cpf: newRow.cpf,
      email: newRow.email,
      senha: 'admin',
      nivelAcesso: newRow.nivelAcesso,
      foto: {
        originalName: 'default.png',
        path: 'default.png',
        size: 200,
        mimetype: 'image/png',
      },
    };

    adminAddUser(objReq);
    setLoading(false);
  }

  return (
    <div>
      <MaterialTable
        title="Lista de Usuários"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updatedRows = [
                ...data,
                { id: Math.floor(Math.random() * 100), ...newRow },
              ];
              setTimeout(() => {
                setData(updatedRows);
                setLoading(false);
                saveUser(newRow);
                resolve();
              }, 2000);
            }),

          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updatedRows = [...data];
              updatedRows[index] = updatedRow;

              setTimeout(() => {
                setData(updatedRows);
                setLoading(false);
                console.log(updatedRow);
                updateUser(updatedRow);
                resolve();
              }, 2000);
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: '#125D98',
            color: '#F5A962',
            fontWeight: 'bold',
          },
          rowStyle: {
            color: '#125D98',
            fontWeight: 'bold',
          },
          actionsColumnIndex: -1,
          addRowPosition: 'first',
        }}
      />
    </div>
  );
}

export default Table;
