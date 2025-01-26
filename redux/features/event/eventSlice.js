'use client';

import { createSlice } from "@reduxjs/toolkit";

// Define the initial user state
const initialUserState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

// Initial state
const initialState = {
    eventForm: initialUserState,
};

const registerSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleEventFormFormChange: (state, action) => {
            const { field, value } = action.payload;
            state.eventForm[field] = value;
        },
    }
});

export const {
    handleEventFormFormChange
} = registerSlice.actions;

export default eventSlice.reducer;