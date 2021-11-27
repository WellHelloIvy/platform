import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes} from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "components/Navigation";

function App() {
  const dispatch:any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return  ( isLoaded ?
    <>
      <Navigation />
      <Routes>
        <Route path="/login" element={<LoginFormPage />} />
        <Route path="/signup" element={<SignupFormPage />} />
      </Routes>
    </>

    :
    <>
    </>
  );
}

export default App;
