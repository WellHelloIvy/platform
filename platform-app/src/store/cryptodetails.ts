import { Dispatch } from 'react';
import { Action } from '../../module'

const LOAD_CRYPTOTICKER = 'cryptoticker/LOAD_CRYPTOTICKER'
const LOAD_CRYPTOCANDLESTICKS = 'cryptocandlesticks/LOAD_CRYPTOCANDLESTICKS'

const loadCryptoTicker = (data: any) => ({
  type: LOAD_CRYPTOTICKER,
  data
})

const loadCryptoCandlesticks = (data:any) => ({
  type: LOAD_CRYPTOCANDLESTICKS,
  data
})


export const getCryptoTicker = (cryptoId:string) => (dispatch: Dispatch<object>) => {
  const options = { method: 'GET', headers: { Accept: 'application/json' } };

  fetch(`https://api.exchange.coinbase.com/products/${cryptoId}-USD/ticker`, options)
    .then(response => response.json())
    .then(response => dispatch(loadCryptoTicker(response)))
    .catch(err => console.error(err));
}

export const getCandleSticks = (cryptoId:string, startDateTime:string, endDateTime:string) => async (dispatch: Dispatch<any>):Promise<any> => {
  const options = {method: 'GET', headers: {Accept: 'application/json'}};

  const response = await fetch(`https://api.exchange.coinbase.com/products/${cryptoId}-USD/candles?granularity=300&start=${startDateTime}&end=${endDateTime}`, options)

  if(response.ok){
    const data = await response.json()
    const closingPrice = data[data.length - 1][4]
    dispatch(loadCryptoCandlesticks(data))
    return closingPrice;
  }
}

export const getCryptoDetails = (cryptoId:string, startDateTime:string, endDateTime:string) => (dispatch: Dispatch<object>) => {
  dispatch(getCryptoTicker(cryptoId))
  dispatch(getCandleSticks(cryptoId, startDateTime, endDateTime))
}


const initialState = {}

const cryptoDetailsReducer = (state = initialState, action: Action) => {
  let newState: object;
  switch (action.type) {
    case LOAD_CRYPTOTICKER:
      newState = Object.assign({}, state);
      newState['ticker'] = action.data
      return newState;
    case LOAD_CRYPTOCANDLESTICKS:
      newState = Object.assign({}, state);
      newState['candlesticks'] = action.data.map((dataPoint:Array<number>) => {
        return {
          'date':dataPoint[0],
          'closingPrice': dataPoint[4]
        }
      })
      return newState;
    default:
      return state;
  }
}

export default cryptoDetailsReducer;
