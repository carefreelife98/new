import './style.css'
import config from '../../tech_blog_config.json'
import Category from "../../interfaces/category";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {POST_BY_CAT_PATH} from "../../constants";
// import GoogleAnalytics from "../GoogleAnalytics/GoogleAnalytics";

export default function SideBar() {

    // state: 전체 게시물 수 상태
    const [totalCount, setTotalCount] = useState<number>(0);

    const navigate = useNavigate();

    const onSubCategoryButtonClickHandler = (categoryName: string, subCategory: string) => {
        // alert('category clicked: ' + subCategory);
        navigate(POST_BY_CAT_PATH(categoryName, subCategory));
    };

    function getTotalCountBySubCategory (categoryName: string, subCategoryName: string): number {
        // require.context를 사용하여 특정 폴더 내의 파일을 가져오기
        const markdownContext = require.context('../../posts', true, /\.md$/);
        const BASE_PATH: string = `./${categoryName}/${subCategoryName}/`;

        // 동적으로 카테고리와 서브카테고리로 필터링
        const targetFiles = markdownContext.keys().filter((filename: string) => {
            return filename.includes(BASE_PATH);
        });

        return targetFiles.length;
    }

    useEffect(() => {

        // require.context를 사용하여 전체 마크다운 파일 개수 가져오기
        const totalCount = require.context('../../posts', true, /\.md$/).keys().length;
        setTotalCount(totalCount);

    }, []);

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

                {/*<GoogleAnalytics /> //TODO: Client Side Render 환경 이슈에 어떤 꼼수로도 조회수 기능 불가.. */}

                <div className='cfl-tech-blog-sidebar-category-box'>
                    <div className='cfl-tech-blog-sidebar-category-title'>{config.posts.sidebar_title} <span className='cfl-tech-blog-sidebar-category-title-count'>({totalCount})</span></div>
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
                                            subCategories.map((subCategory: string, subIndex: number) => {
                                                // 각 서브 카테고리 별 게시물 수 노출
                                                const count: number = getTotalCountBySubCategory(categoryName, subCategory);

                                                return (
                                                    <div key={subIndex} className='cfl-tech-blog-sidebar-sub-category' onClick={() => onSubCategoryButtonClickHandler(categoryName, subCategory)}>
                                                        {subCategory} {/* 하위 카테고리 */}
                                                        <span className='cfl-tech-blog-sidebar-sub-category-count'>({count})</span>
                                                    </div>
                                                )
                                            })
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
