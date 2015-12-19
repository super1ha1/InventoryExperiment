import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import createHistory from 'history/lib/createBrowserHistory';

const root = document.createElement('div');

document.body.innerHTML = "";
document.body.appendChild(root);

ReactDOM.render(
    <Root
        store={configureStore()}
        history={createHistory()}
        />,
    root
);
