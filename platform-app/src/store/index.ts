import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer:any = combineReducers({
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
