import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addToWatchlist, removeFromWatchlist } from "store/watchlists"
import { State } from "../../../module"
import DeleteIcon from '@mui/icons-material/Delete';


const WatchlistButton = ({cryptoId, sessionUser}:any) => {
  const dispatch = useDispatch()
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

    const handleAddWatchlistClick = (cryptoId: string, watchlistId: number) => {
    dispatch(addToWatchlist(cryptoId, watchlistId))
  }

  const handleRemoveWatchlistClick = (cryptoId: any) => {
    dispatch(removeFromWatchlist(cryptoId, defaultWatchlist.id))
  }

  return( isInWatchlist?
    <>
    <DeleteIcon color='primary' onClick={() => handleRemoveWatchlistClick(cryptoId)}>Remove from Watchlist</DeleteIcon>
    </>
    :
    <>
    <Button onClick={() => handleAddWatchlistClick(cryptoId, defaultWatchlist.id)}>Add to Watchlist</Button>
    </>

  )}

export default WatchlistButton
