import React from "react";
import "../../style/footer/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

const Footer = () => {
    const theme = useSelector((state) => state.theme.theme);
    const imgLinkSrc = theme === 'night'
        ? 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1727943030/A%CC%89nh_chu%CC%A3p_ma%CC%80n_hi%CC%80nh_2024-10-03_150950_wrojes.png'
        : 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726243028/copyright_5009849_xu654e.png';
    return (
        <div className={`footer-container ${theme === 'night' ? 'night-theme' : 'day-theme'}`}>
            <a className="footer-item" href=""><img className="footer-img" src={imgLinkSrc} />2024</a>
            <a className="footer-item" href="">X (Twitter)</a>
            <a className="footer-item" href="">Linkedln</a>
            <a className="footer-item" href="">Email</a>
            <a className="footer-item" href="">Facebook</a>
            <a className="footer-item" href="">Github</a>
        </div>
    )
}
export default Footer;