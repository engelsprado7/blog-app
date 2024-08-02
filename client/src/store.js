import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './reducers/postsReducer';

const rootReducer = combineReducers({
    posts: postsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
