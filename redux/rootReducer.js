import { combineReducers } from 'redux';
import userReducer from './features/auth/authSlice';
import eventReducer from './features/event/eventSlice';
import { apiSlice } from './features/api/apiSlice';

// Import other reducers here

const rootReducer = combineReducers({
// API slice reducer
[apiSlice.reducerPath]: apiSlice.reducer,

user: userReducer,
event: eventReducer,
});

export default rootReducer;