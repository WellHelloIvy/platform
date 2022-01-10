import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../../../module';



export default function DataTable() {
  const navigate = useNavigate()
  const cryptocurrencies =Object.values(useSelector((state:State) => state.cryptocurrencies))

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
  ];

  const rows = cryptocurrencies.slice();

  return (
    <div style={{ height: 300, width: '50%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100]}
        onRowClick={(e) => navigate(`/cryptocurrencies/${e.id}`)}
      />
    </div >
  );
}
