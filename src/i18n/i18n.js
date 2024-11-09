import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HOME_EN from '../locales/en/home.json';
import PROJECT_EN from '../locales/en/project.json';
import ABOUT_EN from '../locales/en/about.json';
import BLOG_EN from '../locales/en/blog.json';
import HOME_VI from '../locales/vi/home.json';
import PROJECT_VI from '../locales/vi/project.json';
import ABOUT_VI from '../locales/vi/about.json';
import BLOG_VI from '../locales/vi/blog.json';
const resources = {
    en: {
        home: HOME_EN,
        project: PROJECT_EN,
        about: ABOUT_EN,
        blog: BLOG_EN,
    },
    vi: {
        home: HOME_VI,
        project: PROJECT_VI,
        about: ABOUT_VI,
        blog: BLOG_VI,
    }
};
const savedLanguage = localStorage.getItem('language') || 'en';


i18n
    .use(initReactI18next) // Kết nối i18next với react-i18next
    .init({
        resources,
        lng: savedLanguage, // Sử dụng ngôn ngữ từ localStorage
        ns: ["home", "project", "about", "blog"],
        fallbackLng: 'en', // Ngôn ngữ dự phòng
        interpolation: {
            escapeValue: false, // React đã tự động escape XSS
        }
    });

export default i18n;
