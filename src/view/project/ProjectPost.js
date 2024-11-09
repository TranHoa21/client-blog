import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../style/project/projectPost.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import sanitizeHtml from 'sanitize-html';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const ProjectPost = () => {
    const { link } = useParams(); // Get the link from the URL
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const { t, i18n } = useTranslation("blog");
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long' }; // Ví dụ: "September 2024"
        const locale = i18n.language === 'vi' ? 'vi-VN' : 'en-US'; // Choose the locale based on the language
        return date.toLocaleDateString(locale, options);
    };
    const theme = useSelector((state) => state.theme.theme);

    // Fetch posts from API based on the current page
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
                const sortedProjects = fetchedProjects.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setProjects(sortedProjects.slice(0, 3)); // Get the 6 most recent posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [i18n.language]);
    const sanitizeContent = (content) => ({
        __html: sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: {
                '*': ['class'], // Cho phép thuộc tính 'class' trên tất cả các thẻ
                'img': ['src', 'alt', 'class'] // Đảm bảo thẻ 'img' có thể có các thuộc tính 'src', 'alt', và 'class'
            }
        })
    });
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/api/v1/project/${link}`);
                let fetchedProject = response.data;
                if (i18n.language === 'vi') {
                    fetchedProject = {
                        ...fetchedProject,
                        title: fetchedProject.title_vietnamese,
                        description: fetchedProject.description_vietnamese,
                        content: fetchedProject.content_vietnamese,
                        tag: fetchedProject.tag_vietnamese
                    };
                }
                setProject(fetchedProject);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchPost();
    }, [link, i18n.language]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`post-link-body ${theme === 'night' ? 'night-theme' : 'day-theme'}`}>
            <div className="postlink container">
                <div className="post-link row">
                    <div className="col-md-4 post-link-box">
                        <h4 className="recent-title">{t('recent_blog')}</h4>
                        {projects.map((projects) => (
                            <div className="post-link-box-item" key={projects.id}>
                                <img className="recent-box-item-image" src={projects.image} alt={projects.title} />
                                <h6 className="item-name">{projects.author} - {formatDate(projects.createdAt)}</h6>
                                <div className="item-box">
                                    <h4 className="item-blog-title">{projects.title}</h4>
                                    <Link to={`/project/${projects.link}`}>
                                        <img className="item-box-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726077797/arrow-upper-right_3353034_u5adnr.png" alt="Link" />
                                    </Link>
                                </div>
                                <p className="item-blog-describe">{projects.description}</p>
                                <div className="all-tag">
                                    {Array.isArray(projects.tag) && projects.tag.map((tag, tagIndex) => (
                                        <p key={tagIndex} className={`the-tag${tagIndex + 1}`}>{tag}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-8 post-link-box">
                        <h6 className="item-name">{project.author} - {formatDate(project.createdAt)}</h6>
                        <h1 className="post-link-item-title">{project.title}</h1>
                        <img className="post-link-item-image" src={project.image} alt={project.title} />
                        <div className="post-link-item-data" dangerouslySetInnerHTML={sanitizeContent(project.content)} />
                        <div className="post-link-item-bottom">
                            <h5 className="item-bottom-content">{t('newlatters')}</h5>
                            <h1 className="item-bottom-title">{t('stories')}</h1>
                            <h5 className="item-bottom-data">{t('subscribe_to')}</h5>
                            <div className="item-bottom-sub">
                                <div className="item-bottom-box">
                                    <input className="item-bottom-input" type="text" />
                                    <button className="item-bottom-btn">{t('subscribe')}</button>
                                </div>
                                <p className="item-bottom-ct">{t('we_care_about')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPost;