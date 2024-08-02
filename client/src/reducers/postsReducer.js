import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    EDIT_POST_REQUEST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE
} from '../actions/postsActions';

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_POSTS_SUCCESS:
            return { ...state, loading: false, posts: action.payload, error: null };
        case FETCH_POSTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case 'ADD_POST_SUCCESS':
            return { ...state, posts: [...state.posts, action.payload] };
        case DELETE_POST_SUCCESS:
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) };

        case EDIT_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post =>
                    post._id === action.payload._id ? action.payload : post
                )
            };
        case EDIT_POST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case EDIT_POST_FAILURE:
            console.log("EDIT_POST_FAILURE")

            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default postsReducer;
