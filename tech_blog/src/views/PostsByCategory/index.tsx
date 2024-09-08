import {useEffect, useState} from "react";
import FrontMatter from "../../interfaces/frontmatter";
import fm from "front-matter";
import {useParams} from "react-router-dom";

export default function PostsByCategory() {
    const {categoryName, subCategoryName} = useParams();

    // state: 각 subCategory 별 모든 포스트의 Front matter 정보 리스트 상태
    const [postMetaDataList, setPostMetaDataList] = useState<FrontMatter[] | null>(null);

    useEffect(() => {
        // require.context를 사용하여 특정 폴더 내의 파일을 가져오기
        const markdownContext = require.context('../../posts', true, /\.md$/);

        // 동적으로 카테고리와 서브카테고리로 필터링
        const targetFiles = markdownContext.keys().filter((filename: string) => {
            return filename.includes(`/${categoryName}/${subCategoryName}/`);
        });

        if (targetFiles.length <= 0) return;

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

        // 모든 파일이 로드된 후에만 상태 업데이트
        Promise.all(fetchMarkdownFiles).then((results) => {
            const validResults = results.filter((res) => res !== null); // null을 제외
            setPostMetaDataList(validResults as FrontMatter[]);
        });
    }, [categoryName, subCategoryName]);

    return (
        //TODO: 카드 형태 스타일 설정
        <div id='cfl-tech-blog-posts-by-cat-page-wrapper'>
            {postMetaDataList &&
                postMetaDataList.map((postMetaData, index) => {
                    // 카드 형태로 변경
                    return (
                        <div key={index}>
                            <div>{postMetaData.title.toString()}</div>
                            <div>{postMetaData.date}</div>
                            <div>{postMetaData.categories?.join(', ')}</div>
                            <div>{postMetaData.tags?.join(', ')}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}
