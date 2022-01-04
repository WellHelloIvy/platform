import { Paper } from "@mui/material";
import DataTable from "components/CryptocurrencyTable";
// import ColumnVirtualizationGrid from "components/CryptocurrencyTable";
// import ReactVirtualizedTable from "components/CryptocurrencyTable";


function TradePage(){

  return(
    <Paper elevation={0}>
      <DataTable />
    </Paper>
  )
}
export default TradePage;
