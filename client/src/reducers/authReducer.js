const initialState = {
    isAuthenticated: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return { ...state, isAuthenticated: false, error: null };
        case 'REGISTER_FAILURE':
            return { ...state, error: action.payload };
        case 'LOGIN_SUCCESS':
            console.log("REDUCER LOGIN_SUCCESS ")
            return { ...state, isAuthenticated: true, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
