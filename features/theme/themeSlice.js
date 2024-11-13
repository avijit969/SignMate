import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light'
}

const themeSlice = createSlice({
    name: 'theme_mode',
    initialState,
    reducers: {
        toggleThemeMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        }
    }
});

export const { toggleThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
