const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);


export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case 'REGISTER_SUCCESS':
            return { ...state, isAuthenticated: false, user: action.payload, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, isAuthenticated: true, user: action.payload, error: null };
        case 'AUTH_ERROR':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        default:
            return state;
    }
}
