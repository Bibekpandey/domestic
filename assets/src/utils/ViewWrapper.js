import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


const propTypes = {
    authenticated: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired,
};

const ViewWrapper = (Component) => {
    const Wrapped = (props) => {
        const { authenticated, location } = props;

        if (!authenticated && location.pathname !== '/login') {
            return (<Redirect to="/login" />);
        }
        if (authenticated && location.pathname === '/login') {
            return (<Redirect to="/" />);
        }
        return <Component {...props} />;
    };
    Wrapped.propTypes = propTypes;
    return Wrapped;
};

export default ViewWrapper;
