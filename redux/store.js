"use client"

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { apiSlice } from './features/api/apiSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;