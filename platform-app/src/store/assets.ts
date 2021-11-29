import { Dispatch } from "redux";
import { Action, Asset, LoadAssetData } from '../../module'

const LOAD_ASSETS = 'assets/LOAD_ASSETS'

const loadAssets = (data:Array<LoadAssetData>) => ({
  type: LOAD_ASSETS,
  data
})

export const getAssets = (sessionUserId:number) => async(dispatch: Dispatch):Promise<any> => {
  const response = await fetch(`/api/users/${sessionUserId}/assets`)
    if(response.ok) {
      const data = await response.json();
      dispatch(loadAssets(data));
      return null;
    }
}

const initialState = {}

const assetsReducer = (state = initialState, action: Action) => {
  let newState;
  switch (action.type) {
    case LOAD_ASSETS:
      newState = Object.assign({}, state);
      action.data.assets.forEach((asset: Asset) => {
        newState[asset.id] = asset
      });
      return newState;
    default:
      return state;
  }
};

export default assetsReducer;
