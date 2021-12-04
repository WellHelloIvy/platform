import Watchlist from "components/Watchlist";

function Dashboard({ sessionUser }:any) {


  return( sessionUser ?
    <Watchlist sessionUser={sessionUser} />
    :
    <>splash page</>
  )
}
export default Dashboard;
