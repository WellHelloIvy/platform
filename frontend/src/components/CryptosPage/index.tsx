import DataTable from "components/CryptocurrencyTable";
// import ColumnVirtualizationGrid from "components/CryptocurrencyTable";
// import ReactVirtualizedTable from "components/CryptocurrencyTable";
import './CryptosPage.css'


function TradePage(){

  return(
    <div className="trading-container">
      <DataTable />
    </div>

  )
}
export default TradePage;
