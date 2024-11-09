import React, { useState, useEffect } from "react";
import "../../style/home/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const { t, i18n } = useTranslation();
    const [recentPosts, setRecentPosts] = useState([]);
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
                const response = await axios.get(`http://localhost:3003/api/v1/post?page=${currentPage}`);
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
                setPosts(fetchedPosts);
                setPageCount(response.data.total_pages);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const fetchRecentPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/api/v1/post`); // Adjust the API endpoint as necessary
                const fetchedRecentPosts = response.data.posts.map(post => {
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
                const sortedPosts = fetchedRecentPosts.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setRecentPosts(sortedPosts.slice(0, 4)); // Get the 6 most recent posts
            } catch (error) {
                console.error('Error fetching recent posts:', error);
            }
        };

        fetchPosts();
        fetchRecentPosts(); // Call the recent posts fetch
    }, [currentPage, i18n.language]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1; // Cộng 1 để giữ currentPage bắt đầu từ 1
        setCurrentPage(selectedPage);
    };
    const blogTitleSrc = theme === 'night'
        ? 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1727292368/the-blog-night_ngshoh.png'
        : 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726061059/A%CC%89nh_chu%CC%A3p_ma%CC%80n_hi%CC%80nh_2024-09-11_201012_rm1bq7.png';

    const imgLinkSrc = theme === 'night'
        ? 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1727301423/A%CC%89nh_chu%CC%A3p_ma%CC%80n_hi%CC%80nh_2024-09-26_045646_jgjukz.png'
        : 'https://res.cloudinary.com/dhjrrk4pg/image/upload/v1726077797/arrow-upper-right_3353034_u5adnr.png';
    return (
        <div className={`home-body ${theme === 'night' ? 'night-theme' : 'day-theme'}`}>
            <div className="the-blog"><img src={blogTitleSrc} className="the-blog-title" />
            </div>
            <div className="recent-container">
                <h4 className="recent-title">{t('recent_posts')}</h4>
                <div className="recent-box row">
                    {recentPosts.length > 0 ? (
                        <>
                            {/* Index 0: Hiển thị trong một col-md-6 riêng biệt */}
                            <div className="col-md-6 recent-box-item" key={recentPosts[0].id}>
                                <img className="recent-box-item-image" src={recentPosts[0].image} alt={recentPosts[0].title} />
                                <h6 className="item-name">{recentPosts[0].author} - {formatDate(recentPosts[0].createdAt)}</h6>
                                <div className="item-box">
                                    <h4 className="item-blog-title">{recentPosts[0].title}</h4>
                                    <Link to={`/blog/${recentPosts[0].link}`}>
                                        <img className="item-box-img" src={imgLinkSrc} alt="Link" />
                                    </Link>
                                </div>
                                <p className="item-blog-describe">{recentPosts[0].description}</p>
                                <div className="all-tag">
                                    {Array.isArray(recentPosts[0].tag) && recentPosts[0].tag.map((tag, tagIndex) => (
                                        <p key={tagIndex} className={`the-tag${tagIndex + 1}`}>{tag}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Index 1 và 2: Hiển thị trong một col-md-6 khác */}
                            <div className="col-md-6">
                                <div className="row">
                                    {[1, 2].map(index => (
                                        <div className="col-md-12 recent-box-item" key={recentPosts[index].id}>
                                            <div className="box-right-box1 row">
                                                <div className="col-md-7 item-right-data">
                                                    <img className="box-right-img" src={recentPosts[index].image} alt={recentPosts[index].title} />
                                                </div>
                                                <div className="col-md-5 item-right-data">
                                                    <h6 className="item-name">{recentPosts[index].author} - {formatDate(recentPosts[index].createdAt)}</h6>
                                                    <div className="item-box">
                                                        <h5 className="item-blog-title">{recentPosts[index].title}</h5>
                                                        <Link to={`/blog/${recentPosts[0].link}`}>
                                                            <img className="item-box-img" src={imgLinkSrc} alt="Link" />
                                                        </Link>
                                                    </div>
                                                    <p className="item-blog-describe">{recentPosts[index].description}</p>
                                                    <div className="all-tag">
                                                        {Array.isArray(recentPosts[index].tag) && recentPosts[index].tag.map((tag, tagIndex) => (
                                                            <p key={tagIndex} className={`the-tag${tagIndex + 1}`}>{tag}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Index 3: Hiển thị trong một row khác bên dưới */}
                            <div className="row recent-box2" key={recentPosts[3].id}>
                                <div className="col-md-6 recent-box-item">
                                    <img className="recent-box-item-image" src={recentPosts[3].image} alt={recentPosts[3].title} />
                                </div>
                                <div className="col-md-6 recent-box-item2">
                                    <h6 className="item-name">{recentPosts[3].author} - {formatDate(recentPosts[3].createdAt)}</h6>
                                    <div className="item-box">
                                        <h4 className="item-blog-title">{recentPosts[3].title}</h4>
                                        <Link to={`/blog/${recentPosts[3].link}`}>
                                            <img className="item-box-img" src={imgLinkSrc} alt="Link" />
                                        </Link>
                                    </div>
                                    <p className="item-blog-describe">{recentPosts[3].description}</p>
                                    <div className="all-tag">
                                        {Array.isArray(recentPosts[3].tag) && recentPosts[3].tag.map((tag, tagIndex) => (
                                            <p key={tagIndex} className={`the-tag${tagIndex + 1}`}>{tag}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>{t('no_recent_posts')}</p>
                    )}
                </div>
            </div>


            <div className="all-post-container">
                <h4 className="all-post-title">{t('all_posts')}</h4>
                <div className="map-all-post row">
                    {posts.map((post) => (
                        <div className="all-post-box col-md-4" key={post.id}>
                            <img className="recent-box-item-image" src={post.image} alt={post.title} />
                            <h6 className="item-name">{post.author} - {formatDate(post.createdAt)}</h6>
                            <div className="item-box">
                                <h4 className="item-blog-title">{post.title}</h4>
                                <Link to={`/blog/${post.link}`}>
                                    <img className="item-box-img" src={imgLinkSrc} alt="Link" />
                                </Link>
                            </div>
                            <p className="item-blog-describe">{post.description}</p>

                            <div className="all-tag">
                                {Array.isArray(post.tag) && post.tag.map((tag, tagIndex) => (
                                    <p key={tagIndex} className={`the-tag${tagIndex + 1}`}>{tag}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pagination">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={t('next')}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={t('previous')}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>

        </div>
    )
}
export default Home;