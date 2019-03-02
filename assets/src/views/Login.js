import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
    loginAction,
} from '#redux';

/*
import {
    authenticatedSelector,
} from '#selectors';
*/

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { googleLoginUrl } from '../config/variables';

import FormInput from '../utils/FormInput';

import { tokenUrl } from '../config/urls';
import request from '../utils/request';
import { urlParamsToObject } from '../utils/common';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const GOOGLE_TOKEN_URL = 'http://localhost:8000/token/google/';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                email: '',
                password: '',
            },
            formElements: [
                { id: 'email', label: 'Email', type: 'string' },
                { id: 'password', label: 'Password', type: 'password' },
            ],
        };
    }

    componentDidMount() {
        // eslint-disable-next-line no-undef
        const query = window.location.search;
        const queryObj = urlParamsToObject(query);
        if (Object.keys(queryObj).length === 0) {
            return;
        }
        // login to server
        request.post(
            GOOGLE_TOKEN_URL,
            queryObj,
            this.postSocialLogin,
        );
    }

    postSocialLogin = (data) => {
        const { login } = this.props;
        login(data);
        // THEN redirect to home page
    }

    setFormValues = (formVals) => {
        const formValues = formVals;
        this.setState({ formValues });
    }

    handleLogin = () => {
        const { formValues: loginParams } = this.state;
        request.post(
            tokenUrl,
            loginParams,
            () => { },
        );
    }

    render() {
        const { classes } = this.props;
        const { formElements } = this.state;
        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5"> Sign in </Typography>

                    <FormInput
                        formClass={classes.form}
                        formElements={formElements}
                        setFormValues={this.setFormValues}
                    >
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <a href={googleLoginUrl}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                            >
                                Login with Google
                            </Button>
                        </a>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.handleLogin}
                        >
                            Sign in
                        </Button>

                    </FormInput>
                </Paper>
            </main>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    login: authData => dispatch(loginAction(authData)),
});

const mapStateToProps = state => ({
    // authenticated: authenticatedSelector(state),
    // lastNotify: lastNotifySelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Login)
);
