import config from '../../tech_blog_config.json';
import {useEffect, useState} from "react";
import FrontMatter from "../../interfaces/frontmatter";
import fm from "front-matter";

interface Props {
    categoryName: string;
    subCategoryName: string;
}

export default function PostsByCategory({categoryName, subCategoryName}: Props) {
    // state: 각 subCategory 별 모든 포스트의 Front matter 정보 리스트 상태
    const [postMetaDataList, setPostMetaDataList] = useState<FrontMatter[] | null>(null);

    // const bigCategoryList = config.posts.categories;
    // // const targetSubCategory: string[] = bigCategoryList.reduce((acc, category) => {
    // //     const subCatNm = category.subcategories.find((subCatName: string) => subCatName === subCategoryName);
    // //     if (subCatNm !== undefined) {
    // //         acc.push(subCatNm);
    // //     }
    // //     return acc;
    // // }, [] as string[]);

    useEffect(() => {
        // require.context를 사용하여 특정 폴더 내의 파일을 가져오기
        const markdownContext = require.context('../../posts', true, /\.md$/);

        // 동적으로 카테고리와 서브카테고리로 필터링
        const targetFiles = markdownContext.keys().filter((filename: string) => {
            return filename.includes(`/${categoryName}/${subCategoryName}/`);
        });

        if (targetFiles.length <= 0) return;

        const result: FrontMatter[] = [];
        Promise.all(
            targetFiles.map((postPath, index) => {
                fetch(postPath)
                    .then((response) => response.text())
                    .then((text) => {
                        const parsed = fm(text); // front-matter로 메타데이터와 본문을 파싱
                        console.log(parsed.body)
                        // 여기서 타입 단언을 통해 front matter 데이터를 명시적으로 타입 캐스팅 후 결과 배열에 저장.
                        result.push(parsed.attributes as FrontMatter);
                    })
                    .catch((error) => {
                        console.error('Error loading markdown file:', error);
                    });
            })
        ).then(() => setPostMetaDataList(result));
    }, []);

    return (
        <div>
            {postMetaDataList &&
                postMetaDataList.map((postMetaData, index) => {

                    return (
                        <div>
                            <div>{postMetaData.title}</div>
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
