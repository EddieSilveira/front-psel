// import React, { useState } from 'react';
// import { DataGrid } from '@material-ui/data-grid';
// import { Button } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';

// export default function DataTable({ listaUsuarios }) {
//   const [rowData, setRowData] = useState({});
//   const [data, setData] = useState(listaUsuarios);
//   const [open, setOpen] = React.useState(false);
//   const [loading, setLoading] = useState(true);

//   const renderDetailsButton = (params) => {
//     return (
//       <strong>
//         <Button
//           variant="contained"
//           color="secondary"
//           size="small"
//           style={{ marginLeft: 16 }}
//           onClick={() => {
//             setOpen(true);
//             setLoading(false);
//           }}
//         >
//           <EditIcon />
//         </Button>
//       </strong>
//     );
//   };

//   const columns = [
//     { field: '_id', headerName: 'ID', width: 170 },
//     { field: 'nome', headerName: 'NOME', width: 170 },
//     { field: 'cpf', headerName: 'CPF', width: 170 },
//     {
//       field: 'email',
//       headerName: 'EMAIL',
//       type: 'email',
//       width: 190,
//     },
//     {
//       field: 'nivelAcesso',
//       headerName: 'ACESSO',
//       type: 'text',
//       width: 120,
//     },
//     {
//       field: 'actions',
//       headerName: 'ATUALIZAR',
//       width: 160,
//       renderCell: renderDetailsButton,
//     },
//   ];

//   return (
//     <div style={{ height: 400, width: '100%', margin: 0 }}>
//       <DataGrid
//         rows={listaUsuarios}
//         columns={columns}
//         getRowId={(row) => row._id}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         onSelectionModelChange={(ids) => {
//           const selectedIDs = new Set(ids);
//           const selectedRowData = listaUsuarios.filter((row) =>
//             selectedIDs.has(row._id.toString()),
//           );
//           setRowData(selectedRowData);
//         }}
//         checkboxSelection
//       />
//     </div>
//   );
// }
import React, { useState } from 'react';
import MaterialTable from 'material-table';

function Table({ listaUsuarios }) {
  const [data, setData] = useState(listaUsuarios);
  const [userEdit, setUserEdit] = useState({});

  const columns = [
    { title: 'Id', field: '_id', editable: false },
    { title: 'Nome', field: 'nome' },
    { title: 'Email', field: 'email' },
    { title: 'Cpf', field: 'cpf' },
    { title: 'Acesso', field: 'nivelAcesso' },
  ];

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
                resolve();
              }, 2000);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData._id;

              const updatedRows = [...data];
              updatedRows.splice(index, 1);
              setTimeout(() => {
                setData(updatedRows);
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
                console.log(index);
                resolve();
              }, 2000);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: 'first',
        }}
      />
    </div>
  );
}

export default Table;
