import './App.css';
import NavbarCon from "./view/nav/NavBar";
import React, { useEffect } from 'react';
import Home from "./view/home/home.js";
import Footer from "./view/footer/Footer.js";
import BlogPost from './view/blog/BlogPost';
import Project from './view/project/Project';
import Newsleter from './view/newsleter/Newsleter';
import About from './view/about/About';
import ProjectPost from './view/project/ProjectPost.js';
import { useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    document.body.className = theme === 'night' ? 'night-theme' : 'day-theme';
  }, [theme]);
  return (
    <div className={`App ${theme === 'night' ? 'night' : 'day'}`}>
      <NavbarCon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:link" element={<BlogPost />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:link" element={<ProjectPost />} />
        <Route path="/newsleter" element={<Newsleter />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

