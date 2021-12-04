import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { State } from "../../../module"
import { List, ListItem, Paper } from "@mui/material";
import { removeFromWatchlist } from "store/watchlists";
import DeleteIcon from '@mui/icons-material/Delete';



function Watchlist({ sessionUser }: any) {
  const dispatch = useDispatch()

  const watchlistState: any = useSelector((state: State) => state.watchlists)
  const arrayOfWatchlists = Object.values(watchlistState)
  const userWatchlists = arrayOfWatchlists.filter((watchlist: any) => watchlist.uderId === sessionUser?.Id)
  const defaultWatchlist: any = userWatchlists[0]
  const currenciesOnWatchlist = defaultWatchlist.WatchlistCryptos

  const handleRemoveClick = (cryptoId: any) => {
    dispatch(removeFromWatchlist(cryptoId, defaultWatchlist.id))
  }

  return (
    <Paper>
      <section>
        <h1>Your Watchlist</h1>
        {currenciesOnWatchlist?.map((currency: any) => {
          return <List>
            <ListItem
            button
            >
              <Link to={`/cryptocurrencies/${currency.cryptoId}`}>{currency.cryptoId}</Link>
              <DeleteIcon color='primary' onClick={() => handleRemoveClick(currency.cryptoId)}>Remove from Watchlist</DeleteIcon>
            </ListItem>

          </List>
        })}
      </section>
    </Paper>

  )
}
export default Watchlist
