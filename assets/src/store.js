import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

export const initialState = {
    auth: {
        authenticated: false,
        token: {
            access: undefined,
            refresh: undefined,
        },
    },
};

export const store = createStore(
    rootReducer,
    initialState,
);

export default function configureStore(initstate = {}) {
    return createStore(
        rootReducer,
        initstate,
    );
}
