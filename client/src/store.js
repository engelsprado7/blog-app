import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import postsReducer from './reducers/postsReducer';
import authReducer from './reducers/authReducer';


// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};


const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
});
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Persistor
const persistor = persistStore(store);

export { store, persistor };
