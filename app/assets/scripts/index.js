import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, useRouterHistory} from 'react-router'
import { createHashHistory } from 'history'
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

// app
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers,devTools)}>
        <Router history={routerHistory}>
            <Route path="/" component={Index}/>
            <Route path="*" component={NotFound}/>
        </Router>
    </Provider>
,document.querySelector('.app'));

// render
ReactDOM.render(<App />, document.querySelector('.container'))
