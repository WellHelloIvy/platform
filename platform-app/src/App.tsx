import { useState, useEffect } from "react";
import { useDispatch, } from "react-redux";
import { Routes, Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "components/Navigation";
import { getAssets } from "store/assets";
import { getTransactions } from "store/transactions";


function App() {
  const dispatch:any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=> {
    dispatch(sessionActions.restoreUser())
    .then((user:any) => {
      dispatch(getAssets(user?.id))
      dispatch(getTransactions(user?.id))
    })
    .then(() => setIsLoaded(true));


  }, [dispatch]);

  return  ( isLoaded ?
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<h1>hello</h1>} />
      </Routes>
    </>

    :
    <>
    </>
  );
}

export default App;
