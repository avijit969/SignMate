import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: {},
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = {};
        },
        setUserData: (state, action) => {
            state.userData = {
                ...state.userData,
                ...action.payload, 
            };
        },
    },
});

export const { login, logout, setUserData } = authSlice.actions;

export default authSlice.reducer;
