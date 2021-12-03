import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { State } from "../../../module"

function Watchlist() {
  const watchlistState:any = useSelector((state:State) => state?.watchlists)
  const arrayOfWatchlists:any = Object.values(watchlistState)
  const watchlist = arrayOfWatchlists[0]
  const currenciesOnWatchlist = watchlist.WatchlistCryptos

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
