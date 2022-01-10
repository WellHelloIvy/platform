import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import WatchlistButton from 'components/WatchlistButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../../../module';
import './CryptocurrencyTable.css'



export default function DataTable({ sessionUser }: any) {
  const navigate = useNavigate()
  const cryptocurrencies = Object.values(useSelector((state: State) => state.cryptocurrencies))

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Ticker', flex: .5 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'watchlist', headerName: 'Add to / Remove from Watchlist', flex: 1, renderCell: (params: GridCellParams) => (<WatchlistButton cryptoId={params.row.id} sessionUser={sessionUser} />) },
  ];

  const rows = cryptocurrencies.slice();

  return (
      <div style={{ display: 'flex', height: '100%', width:'100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={(e) => navigate(`/cryptocurrencies/${e.id}`)}
            disableSelectionOnClick
          />
        </div >
      </div >
  );
}
