import {
  combineReducers as combine,
  createStore as baseCreateStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import logger from '..//middleware/logger';
import * as reducers from '../reducers';
import persistState from 'redux-localstorage';

const reducer = combine(reducers);
let store;

if (__DEV__) {
  const createStore = compose(
    applyMiddleware(
      thunk,
      logger
    ),
    persistState('inventory', { key: 'jessie' })
  )(baseCreateStore);


  store = createStore(reducer);

  /**
   * Hot replacement of Reducer. Necessary for webpack hot replacement during dev mode.
   */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index');
      store.replaceReducer(nextReducer);
    });
  }
} else {
  const createStore = compose(
    applyMiddleware(
      thunk
    ),
    persistState('inventory', { key: 'jessie' })
  )(baseCreateStore);

  store = createStore(reducer);
}

export default () => store;
