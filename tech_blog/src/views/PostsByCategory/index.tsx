import './style.css';
import {useEffect, useState} from "react";
import FrontMatter from "../../interfaces/frontmatter";
import fm from "front-matter";
import {useNavigate, useParams} from "react-router-dom";
import {POST_DETAIL_PATH} from "../../constants";

export default function PostsByCategory() {
    // state: 최상위 카테고링 이름 상태
    const {categoryName, subCategoryName} = useParams();
    // state: 해당 카테고리에 속한 전체 포스팅 파일의 경로 리스트 상태
    const [filePathList, setFilePathList] = useState<string[]>([]);
    // state: 각 subCategory 별 모든 포스트의 Front matter 정보 리스트 상태
    const [postMetaDataList, setPostMetaDataList] = useState<FrontMatter[] | null>(null);
    // state: 총 게시물 수 상태
    const [totalCount, setTotalCount] = useState<number>(0);

    // function: navigate 함수
    const navigate = useNavigate();

    // event handler: 포스트 카드 클릭 핸들러
    const onPostCardClickHandler = (fileName: string) => {
        if (categoryName && subCategoryName && fileName) {
            console.log("categoryName: " + categoryName + "subCategoryName: " + subCategoryName + "fileName: " + fileName);
            navigate(POST_DETAIL_PATH(categoryName, subCategoryName, fileName));
            return;
        }
    }

    useEffect(() => {
        // require.context를 사용하여 특정 폴더 내의 파일을 가져오기
        const markdownContext = require.context('../../posts', true, /\.md$/);
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
        setTotalCount(targetFiles.length);

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
            setPostMetaDataList(validResults as FrontMatter[]);
        });
    }, [categoryName, subCategoryName]);

    return (
        <div id='cfl-tech-blog-posts-by-cat-wrapper'>
            <div className='cfl-tech-blog-posts-by-cat-title-box'>
                <h1 className='cfl-tech-blog-posts-by-cat-title'>
                    {subCategoryName}
                </h1>
                <div className='cfl-tech-blog-posts-by-cat-title-count-box'>
                    <div className='cfl-tech-blog-posts-by-cat-title-count-desc'>와 관련된 포스팅 수: </div>
                    <div className='cfl-tech-blog-posts-by-cat-title-count'>{totalCount}</div>
                </div>

            </div>
            <div className='divider'/>
            <div className='divider'/>
            <div className='cfl-tech-blog-posts-by-cat-container'>
                <div className='cfl-tech-blog-posts-by-cat-card-container'>
                    {postMetaDataList && categoryName && subCategoryName &&
                        postMetaDataList.map((postMetaData, index) => {
                            // 카드 형태로 변경
                            return (
                                <div key={index} className='cfl-tech-blog-posts-by-cat-card' onClick={() => onPostCardClickHandler(filePathList[index])}>
                                    {postMetaData.teaser &&
                                        <div className='cfl-tech-blog-posts-by-cat-card-teaser-img-box'>
                                            <img className='cfl-tech-blog-posts-by-cat-card-teaser-img'
                                                 src={process.env.PUBLIC_URL + postMetaData.teaser}
                                                 alt={'teaser_image'}/>
                                        </div>
                                    }
                                    <div className='cfl-tech-blog-posts-by-cat-card-metadata-box'>
                                        <div className='cfl-tech-blog-posts-by-cat-card-title'>{postMetaData.title.toString()}</div>
                                        <div className='cfl-tech-blog-posts-by-cat-card-date'>{postMetaData.date}</div>
                                        <div className='cfl-tech-blog-posts-by-cat-card-category-box'>
                                            {postMetaData.categories.length > 0 &&
                                                postMetaData.categories.map((category, index) => {
                                                    return (
                                                        <div className='cfl-tech-blog-posts-by-cat-card-category' key={index}>
                                                            {category}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='cfl-tech-blog-posts-by-cat-card-tag-box'>
                                            <div className='cfl-tech-blog-posts-by-cat-card-tag-icon-box'>
                                                <div className='icon hashtag-icon'/>
                                            </div>
                                            {postMetaData.tags.length > 0 &&
                                                postMetaData.tags.map((tag, index) => {
                                                    return (
                                                        <div className='cfl-tech-blog-posts-by-cat-card-tag' key={index}>
                                                            {tag}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
