import axios from 'axios';

// Action Types
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action Creators
const registerSuccess = () => ({ type: REGISTER_SUCCESS });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });
const loginSuccess = () => ({ type: LOGIN_SUCCESS });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

// Thunk Actions
export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            await axios.post('http://localhost:5000/api/register', userData);
            dispatch(registerSuccess());
        } catch (error) {
            dispatch(registerFailure('Error registering user'));
        }
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            await axios.post('http://localhost:5000/api/login', userData);
            dispatch(loginSuccess());
        } catch (error) {
            dispatch(loginFailure('Error logging in'));
        }
    };
};
