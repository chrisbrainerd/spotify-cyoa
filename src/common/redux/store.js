import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, autoRehydrate } from 'redux-persist';
import * as reducers from "./ducks"; // import all reducers from ducks/index.js
import { syncHistoryWithStore, routerReducer }     from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  combineReducers({
    ...reducers, 
    routing: routerReducer
  }),
  composeEnhancers(
    applyMiddleware(thunk, logger),
    autoRehydrate()
  )
)

persistStore(store);
export default store;