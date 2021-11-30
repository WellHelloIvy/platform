import { Dispatch } from 'react';
import { Action, Crypto } from '../../module'

const LOAD_CRYPTOCURRENCIES = 'cryptocurrencies/LOAD_CRYPTOCURRENCIES'

const loadCryptocurrencies = (data:any) => ({
  type: LOAD_CRYPTOCURRENCIES,
  data
})

export const getCryptocurrencies = () => (dispatch:Dispatch<object>)=> {
  const options = {method: 'GET', headers: {Accept: 'application/json'}};

  fetch('https://api.exchange.coinbase.com/currencies', options)
    .then(response => response.json())
    .then(response => dispatch(loadCryptocurrencies(response)))
    .catch(err => console.error(err));
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
