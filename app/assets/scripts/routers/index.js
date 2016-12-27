import React,{Component} from 'react';
import { Router, Route, IndexRoute, useRouterHistory} from 'react-router'
import { createHashHistory } from 'history'

import App from '../components/app';
import Index from '../components/index';
import NotFound from '../components/not-found';

const routerHistory = useRouterHistory(createHashHistory)({queryKey:false})

export default class Routers extends Component {

    render() {
        return (
            <Router history={routerHistory} onUpdate={() => window.scrollTo(0, 0)}>
                <Route path="/" component={App}>
                    <IndexRoute component={Index} />
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
}
