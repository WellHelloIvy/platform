import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { State } from "../../../module"

function Watchlist() {
  const currenciesOnWatchlist = useSelector((state:State) => state.watchlists?.[0].WatchlistCryptos);


  return(
      <>
        {currenciesOnWatchlist.map((crypto:any) => <Link to={`/cryptocurrencies/${crypto.cryptoId}`}>{crypto.cryptoId}</Link>

          )}
      </>
    )
}
export default Watchlist
