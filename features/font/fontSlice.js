import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    font_size: 16,
    isDefault: true,
};

const fontSlice = createSlice({
    name: "fontSize",
    initialState,
    reducers: {
        increaseFontSize: (state, action) => {
            state.font_size += 1;
            state.isDefault = true;
        },
        decreaseFontSize: (state, action) => {
            state.font_size -= 1;
            state.isDefault = true;
        },
        resetFontSize: (state, action) => {
            state.isDefault = false;
        },
    },
});

export const { increaseFontSize, decreaseFontSize, resetFontSize } = fontSlice.actions;

export default fontSlice.reducer;
