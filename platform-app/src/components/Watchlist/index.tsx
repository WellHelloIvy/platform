import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { State } from "../../../module"
import { Button } from "@mui/material";
import { removeFromWatchlist } from "store/watchlists";


function Watchlist() {
  const dispatch = useDispatch()
  const watchlistState: any = useSelector((state: State) => state?.watchlists)
  const arrayOfWatchlists: any = Object.values(watchlistState)
  const watchlist = arrayOfWatchlists[0]
  const spreadOfWatchlist = watchlist.WatchlistCryptos.slice()

  const [currenciesOnWatchlist, setCurrenciesOnWatchlist] = useState(spreadOfWatchlist)
  const handleRemoveClick = (cryptoId:any) => {
    dispatch(removeFromWatchlist(cryptoId, watchlist.id))
  }

  useEffect(() =>{
    setCurrenciesOnWatchlist([...watchlist.WatchlistCryptos])
  }, [watchlistState])

  return (
    <section>
      <h1>Your Watchlist</h1>
      {currenciesOnWatchlist?.map((currency:any) => {
        return <>
          <Link to={`/cryptocurrencies/${currency.cryptoId}`}>{currency.cryptoId}</Link>
          <Button onClick={() => handleRemoveClick(currency.cryptoId)}>Remove from Watchlist</Button>
        </>
      })}
    </section>
  )
}
export default Watchlist
