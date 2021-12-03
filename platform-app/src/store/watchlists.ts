import { Dispatch } from "redux";
import { Action, Watchlist} from '../../module'

const LOAD_WATCHLISTS = 'watchlists/LOAD_WATCHLISTS'

const loadWatchlists = (data:Array<Watchlist>) => ({
  type: LOAD_WATCHLISTS,
  data
})

export const getWatchlists = (sessionUserId:number) => async(dispatch:Dispatch):Promise<any> => {
  const response = await fetch(`/api/users/${sessionUserId}/watchlists`)
  if(response.ok){
    const data = await response.json();
    dispatch(loadWatchlists(data));
    return sessionUserId;
  }
}

const initialState = {}

const watchlistsReducer = (state = initialState, action: Action) => {
  let newState;
  switch (action.type) {
    case LOAD_WATCHLISTS:
      newState = Object.assign({}, state);
      action.data.forEach((watchlist:Watchlist) => {
        newState[watchlist.id] = watchlist
      });
      return newState;
    default:
      return state;
  }
};

export default watchlistsReducer;
