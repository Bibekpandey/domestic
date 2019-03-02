import { initialAuthState } from  '#redux/initialState';

export const LOGIN_ACTION = 'auth/LOGIN';
export const LOGOUT_ACTION = 'auth/LOGOUT';
export const AUTHENTICATE_ACTION = 'auth/AUTHENTICATE_ACTION';
export const SET_AUTH_INFO_ACTION = 'auth/SET_AUTH_INFO_ACTION';


export const loginAction = ({ access, refresh }) => ({
    type: LOGIN_ACTION,
    access,
    refresh,
});

export const authenticateAction = () => ({
    type: AUTHENTICATE_ACTION,
});

export const login = (state, action) => {
    const { access, refresh } = action;
    console.warn('hey, in reducer with data', action);
    const { token, ...other } = state;
    return {
        token: { access, refresh },
        ...other,
    };
};

export const authenticate = (state, _) => state;

export const authReducers = {
    [LOGIN_ACTION]: login,
    [AUTHENTICATE_ACTION]: authenticate,
};

export default (state = initialAuthState, action) => (
    authReducers[action.type]
        ? authReducers[action.type](state, action)
        : state
);
