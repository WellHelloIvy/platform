import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import WatchlistButton from 'components/WatchlistButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../../../module';



export default function DataTable({ sessionUser }:any) {
  const navigate = useNavigate()
  const cryptocurrencies = Object.values(useSelector((state:State) => state.cryptocurrencies))

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'watchlist', headerName: 'Add to / Remove from Watchlist', width: 130, renderCell: (params:GridCellParams) =>  (<WatchlistButton cryptoId={params.row.id} sessionUser={sessionUser}/>)},
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
