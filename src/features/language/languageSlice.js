import { createSlice } from '@reduxjs/toolkit';

// Kiểm tra nếu có ngôn ngữ trong localStorage, nếu không thì mặc định là 'en'
const initialState = {
    language: localStorage.getItem('language') || 'en',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
            localStorage.setItem('language', action.payload); // Lưu ngôn ngữ vào localStorage
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
