'use client';

import { createSlice } from "@reduxjs/toolkit";

// Define the initial user state
const initialUserState = {
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    location:""
};

// Initial state
const initialState = {
    eventForm: initialUserState,
};

const eventSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleEventFormFormChange: (state, action) => {
            const { field, value } = action.payload;
            state.eventForm[field] = value;
        },
        resetEventForm: (state) => {
            state.eventForm = initialUserState;
        }
    }
});

export const {
    handleEventFormFormChange,
    resetEventForm
} = eventSlice.actions;

export default eventSlice.reducer;