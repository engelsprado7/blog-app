const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return { ...state, isAuthenticated: false, user: action.payload, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, isAuthenticated: true, user: action.payload, error: null };
        case 'AUTH_ERROR':
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
