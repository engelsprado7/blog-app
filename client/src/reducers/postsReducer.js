import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    EDIT_POST_REQUEST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE,
    ADD_POST_SUCCESS
} from '../actions/postsActions';

const initialState = {
    posts: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1
};
const POSTS_PER_PAGE = 3; // or whatever number you use for pagination

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state, loading: false,
                posts: action.payload,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                error: null
            };
        case FETCH_POSTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADD_POST_SUCCESS:

            const updatedPosts = [...state.posts.posts, action.payload];
            return {
                ...state,
                posts: { posts: updatedPosts },
                totalPages: Math.ceil(updatedPosts.length / POSTS_PER_PAGE)
            };

        case DELETE_POST_SUCCESS:
            // Filter out the deleted post based on the payload ID
            const filteredPosts = state.posts.posts.filter(post => post._id !== action.payload);
            return {
                ...state,
                posts: { posts: filteredPosts },
                totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
            };
        case EDIT_POST_SUCCESS:
            const editedPosts = state.posts.posts.map(post =>
                post._id === action.payload._id ? action.payload : post
            );
            return {
                ...state,
                loading: false,
                posts: { posts: editedPosts }
            };

        case EDIT_POST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case EDIT_POST_FAILURE:

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
