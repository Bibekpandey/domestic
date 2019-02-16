import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';

import { routes } from './constants/routes';

import views from './views';
import viewWrap from './utils/ViewWrapper';

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
});

const createRoutePath = (elem) => {
    const ViewComponent = views[elem.viewName];
    if (!ViewComponent) return null;
    // viewWrap checks authentication
    const WrappedComponent = connect(mapStateToProps)(viewWrap(ViewComponent));
    return (
        <Route
            exact
            path={elem.path}
            key={elem.path}
            render={props => <WrappedComponent {...props} />}
        />
    );
};


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    { Object.keys(routes).map(x => createRoutePath(routes[x])) }
                </div>
            </BrowserRouter>
        );
    }
}
