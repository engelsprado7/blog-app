import axios from 'axios';

// Action Types
const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';

// Action Creators
const fetchPostsRequest = () => ({ type: FETCH_POSTS_REQUEST });
const fetchPostsSuccess = (posts) => ({ type: FETCH_POSTS_SUCCESS, payload: posts });
const fetchPostsFailure = (error) => ({ type: FETCH_POSTS_FAILURE, payload: error });
const addPostSuccess = (post) => ({ type: ADD_POST_SUCCESS, payload: post });
const deletePostSuccess = (id) => ({ type: DELETE_POST_SUCCESS, payload: id });

// Thunk Actions
export const fetchPosts = () => {
    return async (dispatch) => {
        dispatch(fetchPostsRequest());
        try {
            const response = await axios.get('http://localhost:5000/api/posts', {
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
            const response = await axios.post('http://localhost:5000/api/posts', post, {
                withCredentials: true, // Include cookies for session management
            });
            dispatch(addPostSuccess(response.data));
        } catch (error) {
            console.error('Error adding post');
        }
    };
};

export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`);
            dispatch(deletePostSuccess(id));
        } catch (error) {
            console.error('Error deleting post');
        }
    };
};
