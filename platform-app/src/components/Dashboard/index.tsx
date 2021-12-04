import Watchlist from "components/Watchlist";

function Dashboard({ sessionUser }:any) {


  return(
    <Watchlist sessionUser={sessionUser} />
  )
}
export default Dashboard;
