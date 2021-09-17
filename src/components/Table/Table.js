import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ModalAdmin from '../ModalAdmin';

export default function DataTable({ listaUsuarios }) {
  const [rowData, setRowData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            setOpen(true);
            setLoading(false);
          }}
        >
          <EditIcon />
        </Button>
      </strong>
    );
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 170 },
    { field: 'nome', headerName: 'NOME', width: 170 },
    { field: 'cpf', headerName: 'CPF', width: 170 },
    {
      field: 'email',
      headerName: 'EMAIL',
      type: 'email',
      width: 190,
    },
    {
      field: 'nivelAcesso',
      headerName: 'ACESSO',
      type: 'text',
      width: 120,
    },
    {
      field: 'actions',
      headerName: 'ATUALIZAR',
      width: 160,
      renderCell: renderDetailsButton,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%', margin: 0 }}>
      <DataGrid
        rows={listaUsuarios}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = listaUsuarios.filter((row) =>
            selectedIDs.has(row._id.toString()),
          );
          setRowData(selectedRowData);
        }}
        checkboxSelection
      />
      <ModalAdmin
        objUsuario={rowData}
        open={open}
        setOpen={setOpen}
        loading={loading}
      />
      ;
    </div>
  );
}
