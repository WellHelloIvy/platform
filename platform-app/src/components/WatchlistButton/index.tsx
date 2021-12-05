import { useSelector } from "react-redux"
import { State } from "../../../module"


const WatchlistButton = ({cryptoId, sessionUser}:any) => {

  const watchlistState: any = useSelector((state: State) => state.watchlists)
  const arrayOfWatchlists = Object.values(watchlistState)
  const userWatchlists = arrayOfWatchlists.filter((watchlist: any) => watchlist.uderId === sessionUser?.Id)
  const defaultWatchlist: any = userWatchlists[0]
  const currenciesOnWatchlist = Object.values(defaultWatchlist.WatchlistCryptos)
  let isInWatchlist = false

  currenciesOnWatchlist.forEach((currency:any) => {
    if(currency.cryptoId === cryptoId) return isInWatchlist = true
    return;
  })


  return( isInWatchlist?
    <>it's in the watchlist</>
    :
    <>it's not in the watchlist</>

  )}

export default WatchlistButton
