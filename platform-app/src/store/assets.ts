import { Dispatch } from "redux";
import { Action, Asset} from '../../module'

const LOAD_ASSETS = 'assets/LOAD_ASSETS'

const loadAssets = (data:Array<Asset>) => ({
  type: LOAD_ASSETS,
  data
})

export const getAssets = (sessionUserId:number) => async(dispatch: Dispatch):Promise<any> => {
  const response = await fetch(`/api/users/${sessionUserId}/assets`)
    if(response.ok) {
      const data = await response.json();
      dispatch(loadAssets(data));
      return sessionUserId;
    }
}

export const addAsset = (userId:number, cryptoId:string, quantity:number) => async(dispatch: Dispatch): Promise<any> => {
  const response = await fetch(`/api/assets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      cryptoId,
      quantity
    })
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(loadAssets(data))
    return null;
  }
}

export const updateAsset = (assetId:number, userId:number, cryptoId:string, quantity:number) => async (dispatch: Dispatch) => {
  const response = await fetch(`/api/assets/${assetId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      cryptoId,
      quantity
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(loadAssets(data));
  }
}

const initialState = {}

const assetsReducer = (state = initialState, action: Action) => {
  let newState;
  switch (action.type) {
    case LOAD_ASSETS:
      newState = Object.assign({}, state);
      action.data.forEach((asset: Asset) => {
        newState[asset.id] = asset
      });
      return newState;
    default:
      return state;
  }
};

export default assetsReducer;
