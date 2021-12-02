import { Dispatch } from 'react';
import { Action } from '../../module'

const LOAD_CRYPTODETAILS = 'cryptodetails/LOAD_CRYPTODETAILS'

const loadCryptoDetails = (data: any) => ({
  type: LOAD_CRYPTODETAILS,
  data
})


const getCryptoTicker = (cryptoId:string) => (dispatch: Dispatch<object>) => {
  const options = { method: 'GET', headers: { Accept: 'application/json' } };

  fetch(`https://api.exchange.coinbase.com/products/${cryptoId}-USD/ticker`, options)
    .then(response => response.json())
    .then(response => dispatch(loadCryptoDetails(response)))
    .catch(err => console.error(err));
}

export const getCryptoDetails = (cryptoId:string) => {
  getCryptoTicker(cryptoId)
}

const initialState = {}

const cryptoDetailsReducer = (state = initialState, action: Action) => {
  let newState: object;
  switch (action.type) {
    case LOAD_CRYPTODETAILS:
      newState = Object.assign({}, state);
      newState['ticker'] = action.data
      return newState;
    default:
      return state;
  }
}

export default cryptoDetailsReducer;
