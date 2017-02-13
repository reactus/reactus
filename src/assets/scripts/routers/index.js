import React, {Component} from "react";
import {Router, Route, IndexRoute, useRouterHistory} from "react-router"
import {createHashHistory} from "history"
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import ReduxPromise from "redux-promise";
import reducers from "./../reducers";

import App from "../components/app";
import Index from "../components/index";
import NotFound from "../components/not-found";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const routerHistory = useRouterHistory(createHashHistory)();

export default class Routers extends Component {

    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducers, devTools)}>
                <Router history={routerHistory} onUpdate={() => window.scrollTo(0, 0)}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Index}/>
                    </Route>
                    <Route path="*" component={NotFound}/>
                </Router>
            </Provider>
        );
    }
}
