import { useSelector } from "react-redux"
import { State } from "../../../module"


const WatchlistButton = ({cryptoId, sessionUser}:any) => {

  const watchlistState: any = useSelector((state: State) => state.watchlists)
  const arrayOfWatchlists = Object.values(watchlistState)
  const userWatchlists = arrayOfWatchlists.filter((watchlist: any) => watchlist.uderId === sessionUser?.Id)
  const defaultWatchlist: any = userWatchlists[0]
  const currenciesOnWatchlist = defaultWatchlist.WatchlistCryptos

  const isInWatchlist = currenciesOnWatchlist.includes(cryptoId)

  return( isInWatchlist?
    <>yes</>
    :
    <>no</>

  )

}

export default WatchlistButton
