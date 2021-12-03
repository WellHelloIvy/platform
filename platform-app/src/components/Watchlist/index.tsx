import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { State } from "../../../module"

function Watchlist() {
  const currenciesOnWatchlist = useSelector((state:State) => state.watchlists?.[0].WatchlistCryptos);


  return(
      <section>
        <h1>Your Watchlist</h1>
        {currenciesOnWatchlist.map((crypto:any) => {
          return <>
            <Link to={`/cryptocurrencies/${crypto.cryptoId}`}>{crypto.cryptoId}</Link>
          </>
         })}
      </section>
    )
}
export default Watchlist
