import {useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { State } from "../../../module"
import { Button } from "@mui/material";
import { removeFromWatchlist } from "store/watchlists";



function Watchlist({ sessionUser }:any) {
  const dispatch = useDispatch()

  const watchlistState:any = useSelector((state:State) => state.watchlists)
  const arrayOfWatchlists = Object.values(watchlistState)
  const userWatchlists = arrayOfWatchlists.filter((watchlist:any) => watchlist.uderId === sessionUser?.Id)
  const defaultWatchlist:any = userWatchlists[0]
  const currenciesOnWatchlist = defaultWatchlist.WatchlistCryptos

  const handleRemoveClick = (cryptoId:any) => {
    dispatch(removeFromWatchlist(cryptoId, defaultWatchlist.id))
  }

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
