import { Dispatch } from 'react';
import { Action, Crypto } from '../../module'

const LOAD_CRYPTOCURRENCIES = 'cryptocurrencies/LOAD_CRYPTOCURRENCIES'

const loadCryptocurrencies = (data:any) => ({
  type: LOAD_CRYPTOCURRENCIES,
  data
})

export const getCryptocurrencies = () => async(dispatch: Dispatch<any>):Promise<any> => {
  const options = {method: 'GET', headers: {Accept: 'application/json'}};

  const response = await fetch('https://api.exchange.coinbase.com/currencies', options)
    if(response.ok) {
      const data = await response.json();
      dispatch(loadCryptocurrencies(data));
      return null;
    }
}

const initialState = {}

const cryptocurrenciesReducer = (state = initialState, action: Action) => {
  let newState:object;
  switch(action.type){
    case LOAD_CRYPTOCURRENCIES:
      newState = Object.assign({}, state);
      action.data.forEach((crypto:Crypto) => {
        newState[crypto.id] = crypto
      })
      return newState;
    default:
      return state;
  }
}

export default cryptocurrenciesReducer;
