import React, { useState, useContext } from 'react';
import MaterialTable from 'material-table';
import { AuthContext } from '../../contexts/auth';

function Table({ listaUsuarios }) {
  const [data, setData] = useState(listaUsuarios);
  const [userEdit, setUserEdit] = useState({});
  const [userSave, setUserSave] = useState({});
  const [loading, setLoading] = useState(true);
  const { editUser, adminAddUser } = useContext(AuthContext);

  const columns = [
    { title: 'Id', field: '_id', editable: false },
    { title: 'Nome', field: 'nome' },
    { title: 'Email', field: 'email' },
    { title: 'Cpf', field: 'cpf' },
    { title: 'Acesso', field: 'nivelAcesso' },
  ];

  async function updateUser() {
    if (!loading) {
      const objReq = {
        _id: userEdit._id,
        nome: userEdit.nome,
        cpf: userEdit.cpf,
        email: userEdit.email,
        senha: userEdit.senha,
        nivelAcesso: userEdit.nivelAcesso,
        foto: {
          originalName: userEdit ? userEdit.foto.originalName : 'default.png',
          path: userEdit ? userEdit.foto.path : 'public/uploads/default.png',
          size: userEdit ? userEdit.foto.size : 2000,
          mimetype: userEdit ? userEdit.foto.mimetype : 'image/png',
        },
      };
      editUser(objReq);
      setLoading(true);
    }
  }

  async function saveUser() {
    if (!loading) {
      const objReq = {
        nome: userSave.nome,
        cpf: userSave.cpf,
        email: userSave.email,
        senha: 'admin',
        nivelAcesso: userSave.nivelAcesso,
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
  }

  updateUser();
  return (
    <div className="App">
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
                setUserSave(newRow);
                setLoading(false);
                if (!loading) saveUser();
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
                setUserEdit(updatedRow);
                setLoading(false);
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
