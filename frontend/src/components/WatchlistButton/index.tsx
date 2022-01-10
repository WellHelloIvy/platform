import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addToWatchlist, removeFromWatchlist } from "store/watchlists"
import { State } from "../../../module"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';



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

    const handleAddWatchlistClick = (e:any, cryptoId: string, watchlistId: number) => {
      e.stopPropagation()
    dispatch(addToWatchlist(cryptoId, watchlistId))
  }

  const handleRemoveWatchlistClick = (e:any, cryptoId: any) => {
    e.stopPropagation()
    dispatch(removeFromWatchlist(cryptoId, defaultWatchlist.id))
  }

  return( isInWatchlist?
    <>
    <Button color='primary' variant='outlined' onClick={(e) => handleRemoveWatchlistClick(e, cryptoId)} aria-label="delete from watchlist" startIcon={<DeleteIcon />}>
      Remove
    </Button>

    </>
    :
    <>
    <Button onClick={(e) => handleAddWatchlistClick(e, cryptoId, defaultWatchlist.id)} aria-label="add to watchlist" variant='outlined' startIcon={<AddIcon />}>Add</Button>
    </>

  )}

export default WatchlistButton
