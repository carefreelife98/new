import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import fm from 'front-matter';
import PostMarkdown from '../../interfaces/postMarkdown';
import FrontMatter from "../../interfaces/frontmatter";

interface MarkdownData {
    content: string;
    data: FrontMatter;
}

export default function Markdown({category, subCategory, fileName}: PostMarkdown) {

    // state: gray-matter 을 사용하여 front-matter 을 파싱한 markdown 파일 내용.
    const [parsedMarkdown, setParsedMarkdown] = useState<MarkdownData | null>(null);
    // const { category, subCategory, fileName } = postMarkdownProps;

    useEffect(() => {

        // require.context를 사용하여 특정 폴더 내의 파일을 가져오기
        const markdownContext = require.context('../../posts', true, /\.md$/);

        // 동적으로 카테고리와 서브카테고리로 필터링
        const targetFiles = markdownContext.keys().filter((filename: string) => {
            return filename.includes(`/${category}/${subCategory}/${fileName}`);
        });

        if (targetFiles.length <= 0) return;

        // 요청한 markdown 파일이 존재하는 경우 /src/posts 폴더로부터의 하위 경로를 저장하고 이를 통해 마크다운 파일을 가져와 렌더링.
        // 파일 경로를 가져옴
        // 경로 예시: "./{BigCategory}/{SubCategory}/{filename}.md
        const markdownPath = markdownContext(targetFiles[0]);

        // fetch로 해당 파일의 내용을 가져옴
        fetch(markdownPath)
            .then((response) => response.text())
            .then((text) => {
                const parsed = fm(text); // gray-matter로 메타데이터와 본문을 파싱
                // 여기서 타입 단언을 통해 데이터를 명시적으로 타입 캐스팅
                setParsedMarkdown({
                    content: parsed.body,
                    data: parsed.attributes as FrontMatter,  // 타입 단언 (Type Assertion)
                });
            })
            .catch((error) => {
                console.error('Error loading markdown file:', error);
            });
    }, [category, subCategory, fileName]);

    return (
        <div style={{width: "100%", justifyContent: "center", display: "flex"}}>
            <div style={{maxWidth: "2048px", width: "100%"}}>
                <div>
                    <h1>{parsedMarkdown?.data.title}</h1>
                    <p>Date: {parsedMarkdown?.data.date}</p>
                    <p>Categories: {parsedMarkdown?.data.categories?.join(', ')}</p>
                    <p>Tags: {parsedMarkdown?.data.tags?.join(', ')}</p>
                </div>
                <div className='divider'/>
                <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
                    {parsedMarkdown?.content}
                </ReactMarkdown>
            </div>
        </div>
    );
};