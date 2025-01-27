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
    eventFormEdit: initialUserState,
    eventSearch:"",
    searchLoading:false,
    showAddEventModal:false
};

const eventSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEventSearch: (state, action) => {
            state.eventSearch = action.payload;
        },
        setShowAddEventModal: (state, action) => {
            state.showAddEventModal = action.payload;
        },
        setSearchLoading: (state, action) => {
            state.searchLoading = action.payload;
        },
        handleEventFormFormChange: (state, action) => {
            const { field, value } = action.payload;
            state.eventForm[field] = value;
        },
        resetEventForm: (state) => {
            state.eventForm = initialUserState;
        },


        setEventFullFormEdit: (state, action) => {
            state.eventFormEdit = action.payload;
        },
        handleEditEventFormFormChange: (state, action) => {
            const { field, value } = action.payload;
            state.eventFormEdit[field] = value;
        },
    }
});

export const {
    handleEventFormFormChange,
    resetEventForm,
    setEventSearch,
    setSearchLoading,
    setShowAddEventModal,
    setEventFullFormEdit,
    handleEditEventFormFormChange
} = eventSlice.actions;

export default eventSlice.reducer;