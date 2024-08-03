import axios from 'axios';

// const apiUrl = process.env.REACT_APP_URL_SERVER || 'https://localhost:5000'
const apiUrl = 'http://localhost:5000';

export const registerUser = (userData) => async (dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}/api/register`, userData);
        dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: error.response.data });
    }
};

export const loginUser = (userData) => async (dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}/api/login`, userData, {
            withCredentials: true
        });
        console.log("RES", res.data);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: error.response.data });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        const response = await axios.get(`${apiUrl}/api/logout`, {
            withCredentials: true
        });
        console.log("logiyt", response)
        dispatch({ type: 'LOGOUT_SUCCESS' });
    } catch (error) {
        console.error('Error logging out:', error);
    }
};