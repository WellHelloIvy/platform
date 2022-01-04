// import * as React from 'react';
// import { useSelector } from 'react-redux';
// import clsx from 'clsx';
// import { WithStyles } from '@mui/styles';
// import withStyles from '@mui/styles/withStyles';
// import { Theme} from '@mui/material/styles';
// import TableCell from '@mui/material/TableCell';
// import Paper from '@mui/material/Paper';
// import {
//   AutoSizer,
//   Column,
//   Table,
//   TableCellRenderer,
//   TableHeaderProps,
// } from 'react-virtualized';
// import { State } from '../../../module';
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { Grid } from '@mui/material';
// import WatchlistButton from 'components/WatchlistButton';
// import { TextField } from '@material-ui/core';


// const styles = (theme: Theme) =>
// ({
//   flexContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     boxSizing: 'border-box',
//   },
//   table: {
//     // temporary right-to-left patch, waiting for
//     // https://github.com/bvaughn/react-virtualized/issues/454
//     '& .ReactVirtualized__Table__headerRow': {
//       ...(theme.direction === 'rtl' && {
//         paddingLeft: '0 !important',
//       }),
//       ...(theme.direction !== 'rtl' && {
//         paddingRight: undefined,
//       }),
//     },
//   },
//   tableRow: {
//     cursor: 'pointer',
//     backgroundColor: '#ffffff'
//   },
//   tableRowHover: {
//     '&:hover': {
//       backgroundColor: '#ffd600',
//       "&:hover > span:hover": {
//         backgroundColor: "lightblue"
//       }
//     },

//   },
//   tableCell: {
//     flex: 1,
//     backgroundColor: '#ffffff'
//   },
//   noClick: {
//     cursor: 'initial',
//   },
// } as const);

// interface ColumnData {
//   dataKey: string;
//   label: string;
//   numeric?: boolean;
//   width: number;
//   align?: string;
// }

// interface Row {
//   index: number;
// }

// interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
//   columns: readonly ColumnData[];
//   headerHeight?: number;
//   onRowClick?: () => void;
//   rowCount: number;
//   rowGetter: (row: Row) => Data;
//   rowHeight?: number;
// }



// class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps> {

//   static defaultProps = {
//     headerHeight: 48,
//     rowHeight: 48,

//   };

//   getRowClassName = ({ index }: Row) => {
//     const { classes, onRowClick } = this.props;

//     return clsx(classes.tableRow, classes.flexContainer, {
//       [classes.tableRowHover]: index !== -1 && onRowClick != null,
//     });
//   };

//   cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
//     const { columns, classes, rowHeight, onRowClick }: any = this.props;

//     return (
//       <TableCell
//         component="div"
//         className={clsx(classes.tableCell, classes.flexContainer, {
//           [classes.noClick]: onRowClick == null,
//         })}
//         variant="body"
//         style={{ height: rowHeight }}
//         align={
//           (columnIndex != null && columns[columnIndex].numeric) || false
//             ? 'right'
//             : 'left'
//         }
//       >
//         {columnIndex === 0 ? <Link to={`/cryptocurrencies/${cellData}`}>
//           {cellData}
//         </Link> : cellData}
//       </TableCell>

//     );
//   };

//   headerRenderer = ({
//     label,
//     columnIndex,
//   }: TableHeaderProps & { columnIndex: number }) => {
//     const { headerHeight, columns, classes }: any = this.props;

//     return (
//       <TableCell
//         component="div"
//         className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
//         variant="head"
//         style={{ height: headerHeight }}
//         align={columns[columnIndex].numeric || false ? 'right' : 'left'}
//       >
//         <span>{label}</span>
//       </TableCell>
//     );
//   };

//   render() {
//     const { classes, columns, rowHeight, headerHeight, ...tableProps }: any = this.props;
//     return (
//       <AutoSizer>
//         {({ height, width }: any) => (
//           <Table
//             height={height}
//             width={width}
//             rowHeight={rowHeight!}
//             gridStyle={{
//               direction: 'inherit',
//             }}
//             headerHeight={headerHeight!}
//             className={classes.table}
//             {...tableProps}
//             rowClassName={this.getRowClassName}
//           >
//             {columns.map(({ dataKey, ...other }: any, index: any) => {
//               return (
//                 <Column
//                   key={dataKey}
//                   headerRenderer={(headerProps: any) =>
//                     this.headerRenderer({
//                       ...headerProps,
//                       columnIndex: index,
//                     })
//                   }
//                   className={classes.flexContainer}
//                   cellRenderer={this.cellRenderer}
//                   dataKey={dataKey}
//                   {...other}
//                 />
//               );
//             })}
//           </Table>
//         )}
//       </AutoSizer>
//     );
//   }
// }

// // const defaultTheme = createTheme();
// const VirtualizedTable = withStyles(null)(MuiVirtualizedTable);

// interface Data {
//   id: string;
//   name: string;
// }

// export default function ReactVirtualizedTable() {

//   const currencies = Object.values(useSelector((state: State) => state.cryptocurrencies));

//   const sessionUser = useSelector((state: State) => state.session.user)

//   for (let key in currencies) {
//     let currency = currencies[key]
//     currency['button'] = <WatchlistButton sessionUser={sessionUser} cryptoId={currency.id} />
//   }
//   const arrayOfCurrencies = currencies.slice()

//   const [rows, setRows] = useState(arrayOfCurrencies);
//   const copyOfRows = currencies.slice()

//   const [searchValue, setSearchValue] = useState('');

//   useEffect(() => {
//     if (!searchValue) return;
//     let searchResults = copyOfRows.filter((row) => row.id.toLowerCase().includes(searchValue.toLowerCase()) || row.name.toLowerCase().includes(searchValue.toLowerCase()))
//     setRows(searchResults)
//   }, [searchValue])

//   // const handleCancel = () => {
//   //   setRows(arrayOfCurrencies)
//   // }

//   return (
//     <section className='container' id='cryptotable' >
//       <Grid container>
//         <Grid item sx={{ mx: "auto", width: "200%" }}>
//           <Paper elevation={0} style={{ height: '800%' }}>
//             <TextField
//               id="filled-search"
//               label="Search field"
//               type="search"
//               variant="filled"
//               value={searchValue}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
//               //create a cancel search
//             />
//             <VirtualizedTable
//               rowCount={rows.length}
//               rowGetter={({ index }) => rows[index]}

//               columns={[
//                 {
//                   width: 120,
//                   label: 'Ticker Symbol',
//                   dataKey: 'id',
//                 },
//                 {
//                   width: 300,
//                   label: 'Name',
//                   dataKey: 'name',
//                 },
//                 {
//                   width: 300,
//                   label: 'Add to/Remove from Watchlist',
//                   align: 'right',
//                   dataKey: 'button',
//                 },
//               ]}
//             />
//           </Paper>
//         </Grid>
//       </Grid>
//     </section>
//   );
// }
// import * as React from 'react';
// import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { State } from '../../../module';

// export interface DataRowModel {
//   id: GridRowId;
//   [price: string]: number | string;
// }

// export interface GridData {
//   columns: GridColDef[];
//   rows: DataRowModel[];
// }

// function useData(rowLength: number, columnLength: number) {
//   const [data, setData] = React.useState<GridData>({ columns: [], rows: [] });

//   React.useEffect(() => {
//     const rows: DataRowModel[] = [];

//     for (let i = 0; i < rowLength; i += 1) {
//       const row = {
//         id: i,
//       };

//       for (let j = 1; j <= columnLength; j += 1) {
//         row[`price${j}M`] = `${i.toString()}, ${j} `;
//       }

//       rows.push(row);
//     }

//     const columns: GridColDef[] = [{ field: 'id', hide: true }];

//     for (let j = 1; j <= columnLength; j += 1) {
//       columns.push({ field: `price${j}M`, headerName: `${j}M` });
//     }

//     setData({
//       rows,
//       columns,
//     });
//   }, [rowLength, columnLength]);

//   return data;
// }

// export default function ColumnVirtualizationGrid() {
//   // const data = useData(100, 1000);

//   // const [data, setData] = React.useState<GridData>({ columns: [], rows: [] });

//   // const currencies = Object.values(useSelector((state: State) => state.cryptocurrencies));

//   //   const sessionUser = useSelector((state: State) => state.session.user)

//   //   for (let key in currencies) {
//   //     let currency = currencies[key]
//   //     currency['button'] = <WatchlistButton sessionUser={sessionUser} cryptoId={currency.id} />
//   //   }
//   // const arrayOfCurrencies = currencies.slice()

//   // const [rows, _setRows] = useState(arrayOfCurrencies);

//   let columns = [{ field: `Ticker Symbol`, headerName: `Ticker Symbol` },
//   { field: `Name`, headerName: `Name` },
//   { field: `Watchlist`, headerName: `Test` },

//   ]

//     let data = {
//       rows,
//       columns,
//     };



//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid {...data} columnBuffer={2} columnThreshold={2} />
//     </div>
//   );
// }

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
