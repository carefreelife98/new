import PostMarkdown from "../../interfaces/postMarkdown";
import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

export default function Markdown(postMarkdownProps: PostMarkdown) {

    // fetch() 를 통해 불러온 markdown 파일 내용 (string)
    const [markdown, setMarkdown] = useState<string>("");

    const category: string = postMarkdownProps.category;
    const subCategory: string = postMarkdownProps.subCategory;
    const markdownName: string = postMarkdownProps.fileName;

    useEffect(() => {

        // require.context를 사용하여 특정 폴더 내의 파일을 가져오기
        const markdownContext = require.context('../../posts', true, /\.md$/);

        // 동적으로 카테고리와 서브카테고리로 필터링
        const targetFiles = markdownContext.keys().filter((filename: string) => {
            return filename.includes(`/${category}/${subCategory}/`);
        });

        // 요청한 markdown 파일이 존재하는 경우 /src/posts 폴더로부터의 하위 경로를 저장하고 이를 통해 마크다운 파일을 가져와 렌더링.
        if (targetFiles.length >= 1) {

            // 파일 경로를 가져옴
            // 경로 예시: "./{BigCategory}/{SubCategory}/{filename}.md
            const markdownPath = markdownContext(targetFiles[0]);

            // fetch로 해당 파일의 내용을 가져옴
            fetch(markdownPath)
                .then((response) => response.text())
                .then((text) => {
                    setMarkdown(text);
                })
                .catch((error) => {
                    console.error('Error loading markdown file:', error);
                });
        }

    }, [category, subCategory, markdownName]);

    return (
        <div style={{width: "100%", justifyContent: "center", display: "flex"}}>
            <div style={{maxWidth: "2048px", width: "100%"}}>
                <>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
                        {markdown}
                    </ReactMarkdown>
                </>
            </div>
        </div>
    );
};
