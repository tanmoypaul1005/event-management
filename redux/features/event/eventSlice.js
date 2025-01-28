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
    currentPage:1,
    searchLoading:false,
    showAddEventModal:false,
    showEditEventModal:false,
    showEventDetailsModal:false,
    eventDetails:false
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


        setShowEventDetailsModal: (state, action) => {
            state.showEventDetailsModal = action.payload;
        },

        setEventDetails: (state, action) => {
            state.eventDetails = action.payload;
        },

        setShowEditEventModal: (state, action) => {
            state.showEditEventModal = action.payload;
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
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
    handleEditEventFormFormChange,
    setShowEventDetailsModal,
    setEventDetails,
    setShowEditEventModal,
    setCurrentPage
} = eventSlice.actions;

export default eventSlice.reducer;