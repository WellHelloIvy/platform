import Watchlist from "components/Watchlist";
import { useSelector } from "react-redux";
import { State } from "../../../module";

function Dashboard() {
 const sessionUser = useSelector((state:State) => state.session?.user)
  return(sessionUser?
    <>
      <Watchlist />
    </>
    :
    <>Splash Page</>
  )
}
export default Dashboard;
