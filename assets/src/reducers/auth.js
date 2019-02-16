export const auth = (state = {}, action) => {
    switch (action.type) {
    case 'AUTH':
        return {
            token: action.payload,
        };
    default:
        return state;
    }
};
