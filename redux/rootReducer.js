import { combineReducers } from 'redux';
import userReducer from './features/auth/authSlice';
import { apiSlice } from './features/api/apiSlice';


// Import other reducers here

const rootReducer = combineReducers({
// API slice reducer
[apiSlice.reducerPath]: apiSlice.reducer,

// Product-related reducer
user: userReducer,

});

export default rootReducer;