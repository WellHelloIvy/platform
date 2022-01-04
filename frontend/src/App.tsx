import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "components/Navigation";
import { getCryptocurrencies } from "store/cryptocurrencies";
import CryptosPage from "components/CryptosPage";
import CryptoDetailsPage from "components/CryptoDetailsPage";
import Dashboard from "components/Dashboard";
import { State } from "../module";
import { getAllWatchlists } from "store/watchlists";
import { createTheme, ThemeProvider} from '@mui/material/styles';


const theme = createTheme();

function App() {
  const dispatch: any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state: State) => state.session?.user)

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.restoreUser())
      await dispatch(getCryptocurrencies())
      await dispatch(getAllWatchlists())
      setIsLoaded(true)
    })();
  }, [dispatch, isLoaded]);

  if (!isLoaded) return null;

  return (
      <ThemeProvider theme={theme}>
          <Navigation />
          <Routes>
            <Route path='/' element={<Dashboard sessionUser={sessionUser} />} />
            <Route path='/cryptocurrencies' element={<CryptosPage />} />
            <Route path='/cryptocurrencies/:cryptoId' element={<CryptoDetailsPage />} />
          </Routes>
      </ThemeProvider>
  );
}

export default App;
