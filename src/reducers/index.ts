import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import flickr from './flickr';

const reducers = {
  flickr,
};
const rootReducer = combineReducers(reducers);

const middlewareEnhancer = applyMiddleware(thunk);

const composeWithDevTools = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const composedEnhancers = composeWithDevTools(middlewareEnhancer);

export const store = createStore(rootReducer, composedEnhancers);

export default rootReducer;