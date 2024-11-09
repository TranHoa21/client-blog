import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '../language/languageSlice';

function LanguageToggle() {
    const language = useSelector((state) => state.language.language);
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(toggleLanguage())}>
            Chuyển sang {language === 'en' ? 'Tiếng Việt' : 'English'}
        </button>
    );
}

export default LanguageToggle;
