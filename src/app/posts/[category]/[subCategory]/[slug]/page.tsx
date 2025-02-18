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

interface pathInterface {
    category: string;
    subCategory: string;
    slug: string;
}

export async function generateStaticParams() {
    // posts 폴더 경로 설정 (프로젝트 루트 기준)
    const postsDir = path.join(process.cwd(), 'public', 'posts');

    // posts 디렉토리 내의 category 디렉토리들을 가져옴
    const categories = fs.readdirSync(postsDir);
    const paths: pathInterface[] = [];

    categories.forEach((category) => {
        const categoryPath = path.join(postsDir, category);
        // category가 디렉토리인지 확인
        if (!fs.statSync(categoryPath).isDirectory()) return;

        // category 내의 subCategory 디렉토리들을 가져옴
        const subCategories = fs.readdirSync(categoryPath);
        subCategories.forEach((subCategory) => {
            const subCategoryPath = path.join(categoryPath, subCategory);
            // subCategory가 디렉토리인지 확인
            if (!fs.statSync(subCategoryPath).isDirectory()) return;

            // subCategory 내의 파일들을 읽음
            const files = fs.readdirSync(subCategoryPath);
            files.forEach((file) => {
                // 마크다운 파일인지 확인 (필요에 따라 확장자 처리)
                if (file.endsWith('.md')) {
                    // slug는 파일 이름 그대로 사용 (원한다면 확장자를 제거할 수도 있음)
                    paths.push({
                        category,
                        subCategory,
                        slug: file.replace('.md', '')
                    });
                }
            });
        });
    });

    return paths;
}
