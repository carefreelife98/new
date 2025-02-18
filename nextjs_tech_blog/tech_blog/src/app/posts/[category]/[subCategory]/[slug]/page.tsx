import Markdown from "../../../../../components/Markdown";
import path from "path";
import fs from "fs";
import FrontMatter from "@/interfaces/frontmatter";
import matter from "gray-matter";

type Params = Promise<{ category: string; subCategory: string; slug: string }>;
export interface PostPageProps {
    params: Params;
}

export interface MarkdownProps {
    metadata?: FrontMatter;
    content: string;
}

// ✅ Markdown 파일을 읽어와서 페이지에 렌더링
export default async function Post({ params }: PostPageProps) {

    const { category, subCategory, slug } = await params;
    const filePath = path.join(
        process.cwd(),
        'public/posts',
        category,
        subCategory,
        `${slug}.md`
    );

    if (!fs.existsSync(filePath)) {
        return <div>해당 포스트를 찾을 수 없습니다.</div>;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content, data: metadata } = matter(fileContent);

    return (
        <div className='flex w-fit flex-shrink'>
            <Markdown content={content} metadata={metadata as FrontMatter} />
        </div>
    );
};