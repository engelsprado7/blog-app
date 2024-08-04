import axios from 'axios';
import { jwtDecode } from "jwt-decode";
// const apiUrl = 'http://localhost:5000';
const apiUrl = process.env.REACT_APP_URL_SERVER || 'https://localhost:5000'

export const loginUser = (userData) => async (dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}/api/login`, userData);
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        const decoded = jwtDecode(token);
        setAuthToken(token);
        dispatch(setCurrentUser(decoded));
    } catch (err) {
        console.error('Error logging in');
    }
};

export const registerUser = (userData) => async (dispatch) => {
    try {
        const res = await axios.post(`${apiUrl}/api/register`, userData);
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        const decoded = jwtDecode(token);
        setAuthToken(token);
        dispatch(setCurrentUser(decoded));
    } catch (err) {
        console.error('Error registering');
    }
};


export const setCurrentUser = (decoded) => {
    return {
        type: 'SET_CURRENT_USER',
        payload: decoded
    };
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}));
};

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};