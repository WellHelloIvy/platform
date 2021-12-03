import { Dispatch } from "redux";
import { Action, Watchlist} from '../../module'
import { csrfFetch } from "./csrf";

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

export const addToWatchlist = (cryptoId:string, watchlistId:number) => async(dispatch:Dispatch):Promise<any> => {
  const response = await csrfFetch(`/api/watchlists/${watchlistId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      watchlistId,
      cryptoId
    })
  })

  if(response.ok) {
    const data = await response.json();
    dispatch(loadWatchlists(data))
    return null;
  }
}

const initialState = {}

const watchlistsReducer = (state = initialState, action: Action) => {
  let newState:any;
  switch (action.type) {
    case LOAD_WATCHLISTS:
      newState = Object.assign({}, state);
      action.data?.forEach((watchlist:any) => {
        newState[watchlist.id] = watchlist
      });
      return newState;
    default:
      return state;
  }
};

export default watchlistsReducer;
