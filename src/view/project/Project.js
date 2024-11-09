import React, { useState, useEffect } from "react";
import "../../style/project/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Project = () => {
    const [projects, setProjects] = useState([]);
    const { t, i18n } = useTranslation("project");
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };
    const theme = useSelector((state) => state.theme.theme);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/api/v1/project`);
                const fetchedProjects = response.data.projects.map(project => {
                    if (i18n.language === 'vi') {
                        return {
                            ...project,
                            title: project.title_vietnamese,
                            description: project.description_vietnamese,
                            content: project.content_vietnamese,
                            tag: project.tag_vietnamese
                        };
                    }
                    return project;
                });
                setProjects(fetchedProjects);

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [i18n.language]);
    const projectTitleSrc = theme === 'night'
        ? 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1727292368/project-night_hf0zcb.png'
        : 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1727026277/project_kf1tn4.png';

    return (
        <div className={`project-body ${theme === 'night' ? 'night-theme' : 'day-theme'}`}>
            <div className="project-title">
                <img className="pro-image" src={projectTitleSrc} alt="Project Title" />
            </div>
            <h1 className="list-project">{t('list_project')}</h1>
            <div className="list-container">

                <div className="list-box1 row ">
                    {projects.map((project, index) => (
                        <div key={project.id} className={`col-sm-${index === 2 ? 12 : 6} list-box-item`}>
                            <img className="recent-box-item-image" src={project.image} alt={project.title} />
                            <h6 className="item-name">{project.author} - {formatDate(project.date)}</h6>
                            <div className="item-box">
                                <h4 className="item-blog-title">{project.title}</h4>
                                <Link to={`/project/${project.link}`}>
                                    <img className="item-box-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726077797/arrow-upper-right_3353034_u5adnr.png" alt="Arrow" />
                                </Link>
                            </div>
                            <p className="item-blog-describe">{project.description}</p>
                            <div className="all-tag">
                                {Array.isArray(project.tag) && project.tag.map((tag, tagIndex) => (
                                    <p key={tagIndex} className={`the-tag${tagIndex + 1}`}>{tag}</p>
                                ))}
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project;
