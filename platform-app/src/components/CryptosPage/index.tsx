import { Paper } from "@mui/material";
import ReactVirtualizedTable from "components/CryptocurrencyTable";
import Search from "components/SearchField";

function TradePage(){

  return(
    <Paper>
      <Search />
      <ReactVirtualizedTable />
    </Paper>
  )
}
export default TradePage;
