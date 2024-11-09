import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: localStorage.getItem('theme') || 'day', // Lấy theme từ localStorage nếu có, mặc định là 'day'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'day' ? 'night' : 'day';
            localStorage.setItem('theme', state.theme); // Lưu vào localStorage khi theme thay đổi
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload); // Lưu vào localStorage khi theme thay đổi
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
