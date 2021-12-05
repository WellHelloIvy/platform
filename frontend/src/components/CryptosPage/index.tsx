import { Paper } from "@mui/material";
import ReactVirtualizedTable from "components/CryptocurrencyTable";


function TradePage(){

  return(
    <Paper elevation={0}>
      <ReactVirtualizedTable />
    </Paper>
  )
}
export default TradePage;
