import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './reducers/postsReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
