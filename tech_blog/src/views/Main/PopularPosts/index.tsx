import {useEffect, useState} from "react";
import FrontMatter from "../../../interfaces/frontmatter";
import fm from "front-matter";
import config from '../../../tech_blog_config.json';
import CategoryList from "../../../components/CategoryList";
import './style.css';
import TagList from "../../../components/TagList";
import {useNavigate} from "react-router-dom";
import {POST_DETAIL_PATH} from "../../../constants";

export default function PopularPosts() {

    const categoryName = config.popular_post_list.category;
    const subCategoryName = config.popular_post_list.subcategory;

    // state: 각 [subCategory] 별 모든 포스트의 Front matter 정보 리스트 상태
    const [popularPostMetaDataList, setPopularPostMetaDataList] = useState<FrontMatter[] | null>(null);
    // state: 해당 카테고리에 속한 전체 포스팅 파일의 경로 리스트 상태
    const [filePathList, setFilePathList] = useState<string[]>([]);

    // function: navigate 함수
    const navigate = useNavigate();

    // event handler: Popular Post 클릭 핸들러
    const onPopularPostClickHandler = (fileName: string) => {
        if (categoryName && subCategoryName && fileName) {
            console.log(categoryName + subCategoryName + fileName);
            navigate(POST_DETAIL_PATH(categoryName, subCategoryName, fileName));
            return;
        }
    }

    useEffect(() => {
        // require.context를 사용하여 특정 폴더 내의 파일을 가져오기
        const markdownContext = require.context('../../../posts', true, /\.md$/);
        const BASE_PATH: string = `./${categoryName}/${subCategoryName}/`;

        // 동적으로 카테고리와 서브카테고리로 필터링
        const targetFiles = markdownContext.keys().filter((filename: string) => {
            return filename.includes(BASE_PATH);
        });

        if (targetFiles.length <= 0) return;

        // 파일 경로에서 카테고리와 서브카테고리를 제거하여 /fileName 형태로 변환 후 상태 저장
        const cleanedFilePaths = targetFiles.map((filename: string) => {
            return filename.replace(BASE_PATH, '/');
        });

        setFilePathList(cleanedFilePaths);

        // 모든 파일을 Promise.all로 한 번에 처리
        const fetchMarkdownFiles = targetFiles.map((postPath, index) => {
            const markdownPath = markdownContext(postPath);
            return fetch(markdownPath)
                .then((response) => response.text())
                .then((text) => {
                    const parsed = fm(text);
                    return parsed.attributes as FrontMatter;
                })
                .catch((error) => {
                    console.error('Error loading markdown file:', error);
                    return null; // 실패한 경우 null을 반환하여 제외 처리 가능
                });
        });

        // 모든 파일이 로드된 후에 상태 업데이트
        Promise.all(fetchMarkdownFiles).then((results) => {
            const validResults = results.filter((res) => res !== null); // null을 제외
            setPopularPostMetaDataList(validResults as FrontMatter[]);
        });
    }, [categoryName, subCategoryName]);

    return (
        <div id='cfl-tech-blog-main-posts-wrapper'>
            <h2 className='cfl-tech-blog-main-popular-posts-desc'>{'👍🏻 인기 TOP 포스트'}</h2>
            {(popularPostMetaDataList !== null && popularPostMetaDataList.length > 1) ?
                <div className='cfl-tech-blog-main-popular-posts-container'>
                    <div className='cfl-tech-blog-main-popular-posts-1st-container'>
                        <div className='cfl-tech-blog-main-popular-posts-1st-left-container'
                             onClick={() => onPopularPostClickHandler(filePathList[0])}>
                            <div className='cfl-tech-blog-main-popular-posts-1st-left-image-box'>
                                <img src={`${process.env.PUBLIC_URL}${popularPostMetaDataList[0].teaser}`}
                                     alt={'popular-post-image'}/>
                            </div>
                            <div className='cfl-tech-blog-main-popular-posts-1st-left-info-box'>
                                <div className='cfl-tech-blog-main-popular-posts-1st-left-date'>
                                    {popularPostMetaDataList[0].date}
                                </div>
                                <div className='cfl-tech-blog-main-popular-posts-1st-left-title'>
                                    {popularPostMetaDataList[0].title}
                                </div>
                                <CategoryList categoryList={popularPostMetaDataList[0].categories}/>
                                <TagList tagList={popularPostMetaDataList[0].tags}/>
                            </div>
                        </div>
                        <div className='cfl-tech-blog-main-popular-posts-1st-right-container'>
                            <div className='cfl-tech-blog-main-popular-posts-1st-right'
                                 onClick={() => onPopularPostClickHandler(filePathList[1])}>
                                <div className='cfl-tech-blog-main-popular-posts-1st-right-image-box'>
                                    <img src={`${process.env.PUBLIC_URL}${popularPostMetaDataList[1].teaser}`}
                                         alt={'popular-post-image'}/>
                                </div>
                                <div className='cfl-tech-blog-main-popular-posts-1st-right-info-box'>
                                    <div className='cfl-tech-blog-main-popular-posts-1st-right-date'>
                                        {popularPostMetaDataList[1].date}
                                    </div>
                                    <div className='cfl-tech-blog-main-popular-posts-1st-right-title'>
                                        {popularPostMetaDataList[1].title}
                                    </div>
                                    <CategoryList categoryList={popularPostMetaDataList[1].categories}/>
                                    <TagList tagList={popularPostMetaDataList[1].tags}/>
                                </div>
                            </div>
                            <div className='divider' style={{width: "90%"}}/>
                            <div className='cfl-tech-blog-main-popular-posts-1st-right'
                                 onClick={() => onPopularPostClickHandler(filePathList[2])}>
                                <div className='cfl-tech-blog-main-popular-posts-1st-right-image-box'>
                                    <img src={`${process.env.PUBLIC_URL}${popularPostMetaDataList[2].teaser}`}
                                         alt={'popular-post-image'}/>
                                </div>
                                <div className='cfl-tech-blog-main-popular-posts-1st-right-info-box'>
                                    <div className='cfl-tech-blog-main-popular-posts-1st-right-date'>
                                        {popularPostMetaDataList[2].date}
                                    </div>
                                    <div className='cfl-tech-blog-main-popular-posts-1st-right-title'>
                                        {popularPostMetaDataList[2].title}
                                    </div>
                                    <CategoryList categoryList={popularPostMetaDataList[2].categories}/>
                                    <div className='cfl-tech-blog-main-popular-posts-tag-box'>
                                        <div className='icon hashtag-icon'/>
                                        <TagList tagList={popularPostMetaDataList[2].tags}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='divider'/>
                    <div className='cfl-tech-blog-main-popular-posts-2st-container'
                         onClick={() => onPopularPostClickHandler(filePathList[3])}>
                        {popularPostMetaDataList[3].teaser &&
                            <div className='cfl-tech-blog-main-popular-posts-2st-image-box'>
                                <img src={`${process.env.PUBLIC_URL}${popularPostMetaDataList[3].teaser}`}
                                     alt={'popular-post-image'}/>
                            </div>
                        }
                        <div className='cfl-tech-blog-main-popular-posts-2st-info-box'>
                            <div className='cfl-tech-blog-main-popular-posts-2st-date'>
                                {popularPostMetaDataList[3].date}
                            </div>
                            <div className='cfl-tech-blog-main-popular-posts-2st-title'>
                                {popularPostMetaDataList[3].title}
                            </div>
                            <CategoryList categoryList={popularPostMetaDataList[3].categories}/>
                            <TagList tagList={popularPostMetaDataList[3].tags}/>
                        </div>
                    </div>
                </div>
                :
                <div>{'해당 데이터가 존재하지 않습니다.'}</div>
            }
            <h2 className='cfl-tech-blog-main-popular-posts-desc'>{'최근 게시된 글 🔥'}</h2>
        </div>
    );
}
