import axios from 'axios';
const apiUrl = process.env.REACT_APP_URL_SERVER || 'https://localhost:5000';
// const apiUrl = 'http://localhost:5000';

// Action Types
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
// Action Types
export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';
// Action Creators
const fetchPostsRequest = () => ({ type: FETCH_POSTS_REQUEST });
const fetchPostsSuccess = (posts) => ({ type: FETCH_POSTS_SUCCESS, payload: posts });
const fetchPostsFailure = (error) => ({ type: FETCH_POSTS_FAILURE, payload: error });

const editPostRequest = () => ({ type: EDIT_POST_REQUEST });
const editPostSuccess = (post) => ({ type: EDIT_POST_SUCCESS, payload: post });
const editPostFailure = (error) => ({ type: EDIT_POST_FAILURE, payload: error });

const addPostSuccess = (post) => ({ type: ADD_POST_SUCCESS, payload: post });

const deletePostSuccess = (id) => ({ type: DELETE_POST_SUCCESS, payload: id });

// Thunk Actions

const getToken = () => localStorage.getItem('jwtToken');
export const fetchPosts = (page = 1, limit = 3) => async (dispatch) => {
    dispatch(fetchPostsRequest());
    const token = getToken();
    try {
        const response = await axios.get(`${apiUrl}/api/posts`, {
            params: { page, limit },
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
        dispatch(fetchPostsFailure('Error fetching posts'));
    }
};

export const addPost = (post) => async (dispatch) => {
    try {
        const token = getToken();

        const response = await axios.post(`${apiUrl}/api/posts`, post, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        // Check if the response status is 200
        if (response.status === 200) {
            dispatch(addPostSuccess(response.data));
        } else {
            console.error('Unexpected response status:', response.status);
            console.error('Response data:', response.data);
        }
    } catch (error) {
        console.error('Error adding post:', error);
        console.error('Error response:', error.response);
    }
};


// Thunk Action for Editing a Post
export const editPost = (id, postData) => async (dispatch) => {
    dispatch(editPostRequest());
    const token = getToken();
    try {
        const response = await axios.put(`${apiUrl}/api/posts/${id}`, postData, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,

        });
        console.log("RESPONSE edit", response.data)
        dispatch(editPostSuccess(response.data));
    } catch (error) {
        dispatch(editPostFailure(error.response ? error.response.data : 'Error editing post'));
    }
};

export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            const token = getToken();

            await axios.delete(`${apiUrl}/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            dispatch(deletePostSuccess(id));
        } catch (error) {
            console.error('Error deleting post');
        }
    };
};
