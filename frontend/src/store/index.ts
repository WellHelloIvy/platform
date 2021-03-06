import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import assetsReducer from './assets';
import cryptocurrenciesReducer from './cryptocurrencies';
import cryptoDetailsReducer from './cryptodetails';
import sessionReducer from './session';
import transactionsReducer from './transactions';
import watchlistsReducer from './watchlists';


const rootReducer:any = combineReducers({
  session: sessionReducer,
  assets: assetsReducer,
  transactions: transactionsReducer,
  watchlists: watchlistsReducer,
  cryptocurrencies: cryptocurrenciesReducer,
  cryptodetails: cryptoDetailsReducer
});

let enhancer:any;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger:any = require('redux-logger').default;
  // @ts-ignore
  const composeEnhancers:any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState?:object):any => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
