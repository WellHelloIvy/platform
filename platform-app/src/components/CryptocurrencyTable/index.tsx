import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@mui/styles';
import { Theme, createTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {
  AutoSizer,
  Column,
  Table,
  TableCellRenderer,
  TableHeaderProps,
} from 'react-virtualized';
import { State } from '../../../module';
import { Link } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const styles = (theme: Theme) =>
  ({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    table: {
      // temporary right-to-left patch, waiting for
      // https://github.com/bvaughn/react-virtualized/issues/454
      '& .ReactVirtualized__Table__headerRow': {
        ...(theme.direction === 'rtl' && {
          paddingLeft: '0 !important',
        }),
        ...(theme.direction !== 'rtl' && {
          paddingRight: undefined,
        }),
      },
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
  } as const);

interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
}

interface Row {
  index: number;
}

interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
  columns: readonly ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => Data;
  rowHeight?: number;
}



class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps> {

  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
    onRowClick: ""
  };

  getRowClassName = ({ index }: Row) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick }:any = this.props;

    return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
          })}
          variant="body"
          style={{ height: rowHeight }}
          align={
            (columnIndex != null && columns[columnIndex].numeric) || false
              ? 'right'
              : 'left'
          }
        >
          {columnIndex===0 ? <Link to={`/cryptocurrencies/${cellData}`}>
          {cellData}
          </Link> : cellData}
        </TableCell>

    );
  };

  headerRenderer = ({
    label,
    columnIndex,
  }: TableHeaderProps & { columnIndex: number }) => {
    const { headerHeight, columns, classes }:any = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps }:any = this.props;
    return (
      <AutoSizer>
        {({ height, width }:any) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight!}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }:any, index:any) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps:any) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(MuiVirtualizedTable);

interface Data {
  id: string;
  name:string;
}

export default function ReactVirtualizedTable() {
  //@ts-ignore
  const dispatch = useDispatch()
  const currencies = Object.values(useSelector((state:State) => state.cryptocurrencies));
//@ts-ignore
  const handleWatchlistClick = (id:string) => {

  }

  for(let key in currencies) {
    let currency = currencies[key]
    currency['button'] = <Button onClick={() => handleWatchlistClick(currency.id)}>Add to Watchlist</Button>
  }
  const arrayOfCurrencies = [...currencies]

  const [rows, setRows] = useState(arrayOfCurrencies);
  const copyOfRows = [...currencies]

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if(!searchValue) return;
    let searchResults = copyOfRows.filter((row) => row.id.toLowerCase().includes(searchValue.toLowerCase()) || row.name.toLowerCase().includes(searchValue.toLowerCase()))
    setRows(searchResults)
   }, [searchValue])

  const handleCancel = () => {
   setRows(arrayOfCurrencies)
  }

  return (
    <Paper style={{ height: 400, width: '50%' }}>
      <SearchBar
        value={searchValue}
        onChange={(searchQuery) => setSearchValue(searchQuery)}
        onCancelSearch={() => handleCancel()}
      />
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 120,
            label: 'Ticker Symbol',
            dataKey: 'id',
          },
          {
            width: 300,
            label: 'Name',
            dataKey: 'name',
          },
          {
            width: 300,
            label: 'Add to Watchlist',
            dataKey: 'button',
          },
        ]}
      />
    </Paper>
  );
}
