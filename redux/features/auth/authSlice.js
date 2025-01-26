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
    showAddTransferProductModal: false,
    registerForm: initialUserState,
    loginForm: {
        email: "",
        password: "",
    },
};



const registerSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // setShowAddTransferProductModal: (state, action) => {
        //     state.showAddTransferProductModal = action.payload;
        // },
        handleRegisterFormChange: (state, action) => {
            const { field, value } = action.payload;
            state.registerForm[field] = value;
        },
        handleLoginFormChange: (state, action) => {
            const { field, value } = action.payload;
            state.loginForm[field] = value;
        },
    }
});

export const {
    handleRegisterFormChange,
    handleLoginFormChange
} = registerSlice.actions;

export default registerSlice.reducer;