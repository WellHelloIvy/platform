import { useState, useEffect } from "react";
import { useDispatch, } from "react-redux";
import { Routes, Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "components/Navigation";
import { getAssets } from "store/assets";
import { getTransactions } from "store/transactions";
import { getWatchlists } from "store/watchlists";
import { getCryptocurrencies } from "store/cryptocurrencies";
import CryptosPage from "components/CryptosPage";


function App() {
  const dispatch:any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=> {
    dispatch(sessionActions.restoreUser())
    .then((user:any) => {
      dispatch(getAssets(user?.id))
      dispatch(getTransactions(user?.id))
      dispatch(getWatchlists(user?.id))
      dispatch(getCryptocurrencies())
    })
    .then(() => setIsLoaded(true));


  }, [dispatch]);

  return  ( isLoaded ?
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<h1>hello</h1>} />
        <Route path='/cryptocurrencies' element={<CryptosPage />} />
        <Route path='/cryptocurrencies/:cryptoId' element={<CryptoDetails />} />
      </Routes>
    </>

    :
    <>
    </>
  );
}

export default App;
