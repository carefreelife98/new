import './style.css'
import config from '../../tech_blog_config.json'
import Category from "../../interfaces/category";
import React from "react";
import {useNavigate} from "react-router-dom";
import {POST_BY_CAT_PATH} from "../../constants";
import GoogleAnalytics from "../GoogleAnalytics/GoogleAnalytics";

export default function SideBar() {

    const navigate = useNavigate();

    const onSubCategoryButtonClickHandler = (categoryName: string, subCategory: string) => {
        // alert('category clicked: ' + subCategory);
        navigate(POST_BY_CAT_PATH(categoryName, subCategory));
    };

    return (
        <div id='cfl-tech-blog-sidebar-wrapper'>
            <div className='cfl-tech-blog-sidebar-container'>
                <div className='cfl-tech-blog-sidebar-author-info-box'>
                    <div className='cfl-tech-blog-sidebar-author-profile-image-box'>
                        <img className='cfl-tech-blog-sidebar-author-profile-image' src={`${process.env.PUBLIC_URL}/assets/image/author.jpeg`} alt='author-image'/>
                    </div>
                    <div className='cfl-tech-blog-sidebar-author-desc-box'>
                        <div className='cfl-tech-blog-sidebar-author-name'>
                            {config.writer_info.job ? config.writer_info.job : ""}
                        </div>
                        <div className='cfl-tech-blog-sidebar-author-name'>
                            {config.writer_info.name ? config.writer_info.name : ""}
                        </div>
                        <div className='cfl-tech-blog-sidebar-author-desc'>
                            {config.writer_info.description ? config.writer_info.description : ""}
                        </div>
                    </div>
                </div>
                <GoogleAnalytics />
                <div className='cfl-tech-blog-sidebar-category-box'>
                    <div className='cfl-tech-blog-sidebar-category-title'>{config.posts.sidebar_title}</div>
                    {config.posts.categories &&
                        config.posts.categories.map((category : Category, index) => {
                            // 각 카테고리 객체의 첫 번째 키를 가져옴
                            const categoryName = category.category;
                            const subCategories = category.subcategories;

                            return (
                                <div key={index} className='cfl-tech-blog-sidebar-big-category'>
                                    <h3>{categoryName}</h3> {/* 상위 카테고리 */}
                                    <div className='divider' />
                                    <div className='cfl-tech-blog-sidebar-sub-category-box'>
                                        {subCategories &&
                                            subCategories.map((subCategory: string, subIndex: number) => (
                                                <div key={subIndex} className='cfl-tech-blog-sidebar-sub-category' onClick={() => onSubCategoryButtonClickHandler(categoryName, subCategory)}>
                                                    {subCategory} {/* 하위 카테고리 */}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className='divider-vertical'></div>
        </div>
    );
}
