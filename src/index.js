import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import "./i18n/i18n";
import i18n from './i18n/i18n'; // Nhập i18n từ file cấu hình của bạn
import { setLanguage } from './features/language/languageSlice'; // Import action để set language trong Redux

// Lấy ngôn ngữ từ localStorage
const savedLanguage = localStorage.getItem('selectedLanguage');
if (savedLanguage && savedLanguage !== i18n.language) {
  i18n.changeLanguage(savedLanguage); // Cập nhật i18n với ngôn ngữ được lưu
  store.dispatch(setLanguage(savedLanguage)); // Cập nhật Redux với ngôn ngữ được lưu
}



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
