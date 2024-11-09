import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../style/blog/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import sanitizeHtml from 'sanitize-html';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const BlogPost = () => {
    const { link } = useParams(); // Get the link from the URL
    const [post, setPost] = useState(null);
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
                setPosts(sortedPosts.slice(0, 6)); // Get the 6 most recent posts
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
                '*': ['class'], // Allow 'class' attribute on all tags
                'img': ['src', 'alt', 'class'] // Ensure 'img' tags can have 'src', 'alt', and 'class' attributes
            }
        })
    });
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/api/v1/post/${link}`);
                let fetchedPost = response.data;
                if (i18n.language === 'vi') {
                    fetchedPost = {
                        ...fetchedPost,
                        title: fetchedPost.title_vietnamese,
                        description: fetchedPost.description_vietnamese,
                        content: fetchedPost.content_vietnamese,
                        tag: fetchedPost.tag_vietnamese
                    };
                }
                setPost(fetchedPost);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [link, i18n.language]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`post-link-body ${theme === 'night' ? 'night-theme' : 'day-theme'}`}>
            <div className="postlink container">
                <div className="post-link row">
                    <div className="col-md-4 post-link-box">
                        <h4 className="recent-title">{t('recent_blog')}</h4>
                        {posts.map((posts) => (
                            <div className="post-link-box-item" key={posts.id}>
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
                        ))}
                    </div>
                    <div className="col-md-8 post-link-box">
                        <h6 className="item-name">{post.author} - {formatDate(post.createdAt)}</h6>
                        <h1 className="post-link-item-title">{post.title}</h1>
                        <img className="post-link-item-image" src={post.image} alt={post.title} />
                        <div className="post-link-item-data" dangerouslySetInnerHTML={sanitizeContent(post.content)} />
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

export default BlogPost;