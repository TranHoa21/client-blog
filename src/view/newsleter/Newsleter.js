import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../style/newsleter/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const Newsleter = () => {
    const { link } = useParams(); // Get the link from the URL
    const [posts, setPosts] = useState([]);
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
                const response = await axios.get(`http://localhost:3003/api/v1/post`);
                const fetchedPosts = response.data.posts.map(post => {
                    if (i18n.language === 'vi') {
                        return {
                            ...post,
                            title: post.title_vietnamese,
                            description: post.description_vietnamese,
                            content: post.content_vietnamese,
                            tag: post.tag_vietnamese
                        };
                    }
                    return post;
                });
                const sortedPosts = fetchedPosts.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setPosts(sortedPosts.slice(0, 3)); // Get the 3 most recent posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [i18n.language]);




    return (
        <div className={`newsleter-body ${theme === 'night' ? 'night-theme' : 'day-theme'}`}>
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
            <div className="postlink container">
                <h4 className="recent-title">{t('recent_blog')}</h4>
                <div className="post-link row">
                    {posts.map((posts) => (
                        <div className="col-md-4 post-link-box" key={posts.id}>
                            <div className="post-link-box-item" >
                                <img className="recent-box-item-image" src={posts.image} alt={posts.title} />
                                <h6 className="item-name">{posts.author} - {formatDate(posts.createdAt)}</h6>
                                <div className="item-box">
                                    <h4 className="item-blog-title">{posts.title}</h4>
                                    <Link to={`/blog/${posts.link}`}>
                                        <img className="item-box-img" src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726077797/arrow-upper-right_3353034_u5adnr.png" alt="Link" />
                                    </Link>
                                </div>
                                <p className="item-blog-describe">{posts.description}</p>
                                <div className="all-tag">
                                    {Array.isArray(posts.tag) && posts.tag.map((tag, tagIndex) => (
                                        <p key={tagIndex} className={`the-tag${tagIndex + 1}`}>{tag}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Newsleter;