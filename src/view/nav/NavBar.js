import React, { useState } from "react";
import "../../style/nav/style.scss";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../features/language/languageSlice';
import { setTheme } from '../../features/theme/themeSlice';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
const NavbarCon = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const { i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Lấy trạng thái ngôn ngữ từ Redux
    const language = useSelector((state) => state.language.language);
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();

    const currentLanguage = language === 'vi' ? 'Tiếng Việt' : 'English';
    const isDay = theme === 'day';
    const handleNightStyle = () => {
        dispatch(setTheme('night'));
        localStorage.setItem('theme', 'night');
    };

    const handleDayStyle = () => {
        dispatch(setTheme('day'));
        localStorage.setItem('theme', 'day');
    };

    const handleLanguageChange = (lang) => {
        // Thay đổi ngôn ngữ bằng i18n
        i18n.changeLanguage(lang);

        // Cập nhật trạng thái ngôn ngữ trong Redux và localStorage
        dispatch(setLanguage(lang));
    };
    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu state
    };

    return (
        <>
            <div className={`nav-container ${theme === 'night' ? 'night-theme' : 'day-theme'} ${isMenuOpen ? 'active' : ''}`}>

                <div className="nav-menu">
                    <div className="logo"> Bach Tuyet </div>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="toggle-icon"
                        onClick={handleToggleMenu}

                    />
                </div>
                {!isMenuOpen && (
                    <div className="nav-menu">

                        <NavLink className={`nav-link  ${pathname === '/' ? 'active' : ''}`} to="/">Blog</NavLink>
                        <NavLink className={`nav-link  ${pathname === '/project' ? 'active' : ''}`} to="/project">Projects</NavLink>
                        <NavLink className={`nav-link  ${pathname === '/about' ? 'active' : ''}`} to="/about">About</NavLink>
                        <NavLink className={`nav-link  ${pathname === '/newsleter' ? 'active' : ''}`} to="/newsleter">Newsleter</NavLink>

                        <div className="language-selector nav-link">
                            <div className="current-language">{currentLanguage}</div>
                            <div className="language-options">
                                <button onClick={() => handleLanguageChange('en')}>English</button>
                                <button onClick={() => handleLanguageChange('vi')}>Tiếng Việt</button>
                            </div>
                        </div>

                        {isDay ? (
                            <div className="day-night nav-link">
                                <button className="night-style" onClick={handleNightStyle}>
                                    <img className="night-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726251780/brightness_7482853_vqu085.png" />
                                </button>
                                <button className="day-style" onClick={handleDayStyle}>
                                    <img className="day-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726253906/icon-trang_xhzwtl.png" />
                                </button>
                            </div>

                        ) : (

                            <div className="day-night-in nav-link">
                                <button className="night-style-in" onClick={handleNightStyle}>
                                    <img className="night-icon-in" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726253906/%C4%91en-icon_gj4peq.png" />
                                </button>
                                <button className="day-style-in" onClick={handleDayStyle}>
                                    <img className="day-icon-in" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726250479/sleep_8101918_kh61n6.png" />
                                </button>
                            </div>
                        )}
                    </div>)}
                {isMenuOpen && (
                    <div className="nav-items">

                        <NavLink className={`nav-link  ${pathname === '/' ? 'active' : ''}`} to="/">Blog</NavLink>
                        <NavLink className={`nav-link  ${pathname === '/project' ? 'active' : ''}`} to="/project">Projects</NavLink>
                        <NavLink className={`nav-link  ${pathname === '/about' ? 'active' : ''}`} to="/about">About</NavLink>
                        <NavLink className={`nav-link  ${pathname === '/newsleter' ? 'active' : ''}`} to="/newsleter">Newsleter</NavLink>

                        <div className="language-selector nav-link">
                            <div className="current-language">{currentLanguage}</div>
                            <div className="language-options">
                                <button onClick={() => handleLanguageChange('en')}>English</button>
                                <button onClick={() => handleLanguageChange('vi')}>Tiếng Việt</button>
                            </div>
                        </div>

                        {isDay ? (
                            <div className="day-night nav-link">
                                <button className="night-style" onClick={handleNightStyle}>
                                    <img className="night-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726251780/brightness_7482853_vqu085.png" />
                                </button>
                                <button className="day-style" onClick={handleDayStyle}>
                                    <img className="day-icon" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726253906/icon-trang_xhzwtl.png" />
                                </button>
                            </div>

                        ) : (

                            <div className="day-night-in nav-link">
                                <button className="night-style-in" onClick={handleNightStyle}>
                                    <img className="night-icon-in" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726253906/%C4%91en-icon_gj4peq.png" />
                                </button>
                                <button className="day-style-in" onClick={handleDayStyle}>
                                    <img className="day-icon-in" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726250479/sleep_8101918_kh61n6.png" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </div>

        </>
    );
};

export default NavbarCon;
