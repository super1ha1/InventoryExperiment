import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';


/*
 * `getComponent` from react-router asynchronously loads the component.
 */
function makeGetComponent(modulePath) {
  return (location, callback) => require.ensure([], require => callback(null, require('' + modulePath)));
}

/**
 * Relevant resources:
 * [history](https://github.com/rackt/history/tree/master/docs)
 * [react-router/history](https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md)
 */
const Root = ({store, history}) => (
  <Provider store={store}>
    <Router history={history}>
      <Route
        path="/"
        getComponent={makeGetComponent('./App')}
      >

      </Route>
      <Route
          path="/user"
          getComponent={makeGetComponent('./User')}
          />
      <Route
          path="/inventory"
          getComponent={makeGetComponent('./Inventory')}
          />
    </Router>
  </Provider>
);

export default Root;
