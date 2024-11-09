import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../theme/themeSlice';

function ThemeToggle() {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(toggleTheme())}>
            Chuyển sang {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
    );
}

export default ThemeToggle;
