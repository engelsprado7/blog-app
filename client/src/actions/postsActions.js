import axios from 'axios';
const apiUrl = process.env.URL_SERVER || 'http://localhost:5000';
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
export const fetchPosts = () => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await axios.get(`${apiUrl}/api/posts`, {
                withCredentials: true, // Include cookies for session management
            });
            dispatch(fetchPostsSuccess(response.data));
        } catch (error) {
            dispatch(fetchPostsFailure('Error fetching posts'));
        }
    };
};

export const addPost = (post) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${apiUrl}/api/posts`, post, {
                withCredentials: true, // Include cookies for session management
            });
            dispatch(addPostSuccess(response.data));
        } catch (error) {
            console.error('Error adding post');
        }
    };
};

// Thunk Action for Editing a Post
export const editPost = (id, postData) => async (dispatch) => {
    console.log("EDIT POST")
    dispatch(editPostRequest());
    try {
        const response = await axios.put(`${apiUrl}/api/posts/${id}`, postData, {
            withCredentials: true, // Include cookies for session management
        });
        console.log("EDIT response", response.data)
        dispatch(editPostSuccess(response.data));
    } catch (error) {
        dispatch(editPostFailure(error.response ? error.response.data : 'Error editing post'));
    }
};

export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${apiUrl}/api/posts/${id}`, {
                withCredentials: true, // Include cookies for session management
            });
            dispatch(deletePostSuccess(id));
        } catch (error) {
            console.error('Error deleting post');
        }
    };
};
