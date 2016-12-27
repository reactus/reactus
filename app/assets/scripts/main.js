import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import FastClick from 'fastclick';
import Routers from './routers/index';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

FastClick.attach(document.body);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers,devTools)}>
        <Routers />
    </Provider>
,document.querySelector('.app'));
