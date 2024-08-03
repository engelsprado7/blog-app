import axios from 'axios';

const apiUrl = process.env.URL_SERVER
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
export const logout = () => async (dispatch) => {
    await axios.get('/api/logout');
    dispatch({ type: 'LOGOUT' });
};
