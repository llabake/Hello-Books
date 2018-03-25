import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/index'


const env = process.env.NODE_ENV || 'development';

let middleware = compose(applyMiddleware(thunk, logger), window.devToolsExtension ?
  window.devToolsExtension() : f => f);

if (env === 'production') {
  middleware = applyMiddleware(thunk);
}

const store = createStore(
  rootReducer,
  middleware
);

export default store;