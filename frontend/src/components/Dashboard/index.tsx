import SplashPage from "components/SplashPage";
import Watchlist from "components/Watchlist";

function Dashboard({ sessionUser }:any) {

  return( sessionUser ?
    <Watchlist sessionUser={sessionUser} />
    :
    <SplashPage />
  )
}
export default Dashboard;
