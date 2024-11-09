import React from 'react';
import "../../style/about/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const About = () => {

    const { t } = useTranslation("about");
    const theme = useSelector((state) => state.theme.theme);

    const aboutTitleSrc = theme === 'night'
        ? 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1727292368/about-night_xshnzj.png'
        : 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1727074214/about_opfjgb.png';

    return (
        <div className={`about-body ${theme === 'night' ? 'night-theme' : 'day-theme'}`}>
            <div className="about-title">
                <img className="about-image" src={aboutTitleSrc} />
            </div>
            <img className="img-about-me" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1727074931/profile_ztitmo.jpg" />
            <h2 className="about-me-title">{t('about')}</h2>
            <p className="about-me-content">{t('about_content')}</p>

            <h2 className="skill-title">{t('skill')}</h2>
            <ul>
                <li><strong>{t('skill_front_end')}</strong>
                    <ul>
                        <li>{t('react')}</li>
                        <li>{t('next')}</li>
                        <li>{t('html')}</li>
                    </ul>
                </li>
                <li><strong>{t('back_end')}</strong>
                    <ul>
                        <li>{t('node')}</li>
                        <li>{t('mongoDB')}</li>
                    </ul>
                </li>
                <li><strong>{t('state')}</strong>
                    <ul>
                        <li>{t('redux')}</li>
                    </ul>
                </li>
                <li><strong>{t('javascript')}</strong>
                    <ul>
                        <li>{t('proficient')}</li>
                    </ul>
                </li>
                <li><strong>{t('seo')}</strong>
                    <ul>
                        <li>{t('strategies')}</li>
                        <li>{t('content_writing')}</li>
                        <li>{t('tool')}</li>
                    </ul>
                </li>
            </ul>
            <h2>{t('experience')}</h2>
            <ul>
                <li>{t('experience_content1')}</li>
                <li>{t('experience_content2')}</li>
                <li>{t('experience_content3')}</li>
            </ul>

        </div>
    );
};

export default About;