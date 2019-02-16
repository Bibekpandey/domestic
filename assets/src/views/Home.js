import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Link to="/login"> login page </Link>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
});

export default connect(mapStateToProps)(Home);
