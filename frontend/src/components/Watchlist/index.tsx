import { useSelector } from "react-redux"
// import { Link } from "react-router-dom";
import { State } from "../../../module"
import { Divider, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import WatchlistButton from "components/WatchlistButton";

function Watchlist({ sessionUser }: any) {

  const watchlistState: any = useSelector((state: State) => state.watchlists)
  const allWatchlists = Object.values(watchlistState)
  const userWatchlists = allWatchlists.filter((watchlist: any) => watchlist.userId === sessionUser?.id)
  const defaultWatchlist: any = userWatchlists[0]
  const currenciesOnWatchlist = defaultWatchlist?.WatchlistCryptos

  const cryptocurrencies = useSelector((state: State) => state.cryptocurrencies)

  return (
    <Paper className='container'>
      <section>
        <h1>Your Watchlist</h1>
        <List aria-label="crypto currenciers on watchlist">
        {currenciesOnWatchlist?.map((currency: any) => {
          return(
            <>
            <ListItem
            button
            sx={{display: 'flex', justifyContent: 'space-between' }}
            >
              <ListItemButton component='a' href={`/cryptocurrencies/${currency.cryptoId}`}>
                <ListItemText primary={`${currency.cryptoId}`} secondary={`${cryptocurrencies[currency.cryptoId].name}`} />
              </ListItemButton>
              <WatchlistButton cryptoId={currency.cryptoId} sessionUser={sessionUser}/>
            </ListItem>
            <Divider component='li'/>
            </>
          )
        })}
        </List>
      </section>
    </Paper>
  )
}
export default Watchlist
