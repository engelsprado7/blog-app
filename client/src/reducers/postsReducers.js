const initialState = {
    posts: [],
    loading: false,
    error: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_POSTS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_POSTS_SUCCESS':
            return { ...state, loading: false, posts: action.payload };
        case 'FETCH_POSTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_POST_SUCCESS':
            return { ...state, posts: [...state.posts, action.payload] };
        case 'DELETE_POST_SUCCESS':
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) };
        default:
            return state;
    }
};

export default postsReducer;
