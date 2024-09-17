import {useEffect, useState} from "react";
import FrontMatter from "../../../interfaces/frontmatter";
import fm from "front-matter";
import config from '../../../tech_blog_config.json';

export default function PopularPosts() {

    const categoryName = config.popular_post_list.category;
    const subCategoryName = config.popular_post_list.subcategory;

    // state: 각 subCategory 별 모든 포스트의 Front matter 정보 리스트 상태
    const [popularPostMetaDataList, setPopularPostMetaDataList] = useState<FrontMatter[] | null>(null);
    // state: 해당 카테고리에 속한 전체 포스팅 파일의 경로 리스트 상태
    const [filePathList, setFilePathList] = useState<string[]>([]);
    // state: 총 게시물 수 상태
    const [totalCount, setTotalCount] = useState<number>(0);

    // function: navigate 함수

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
            setPopularPostMetaDataList(validResults as FrontMatter[]);
        });
    }, []);

    return (
        <div id='cfl-tech-blog-main-popular-posts-wrapper'>
            <div id='cfl-tech-blog-main-popular-posts-container'>
                {(popularPostMetaDataList !== null && popularPostMetaDataList.length > 1) ?
                    <div>{'메인 포스트'}</div>
                    :
                    <div>{'해당 데이터가 존재하지 않습니다.'}</div>
                }
            </div>
        </div>
    );
}
