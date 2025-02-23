import Markdown from "../../../../../components/Markdown";
import path from "path";
import fs from "fs";
import FrontMatter from "@/interfaces/frontmatter";
import matter from "gray-matter";
import {Metadata} from "next";

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

    // 파일명 디코딩
    const decodedSlug = decodeURIComponent(slug as string);
    const filePath = path.join(
        process.cwd(),
        'public/posts',
        category,
        subCategory,
        `${decodedSlug}.md`
    );

    if (!fs.existsSync(filePath)) {
        return <div>해당 포스트를 찾을 수 없습니다.</div>;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content, data: metadata } = matter(fileContent);

    // JSON-LD 데이터 추가
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: metadata.title,
        datePublished: metadata.date,
        author: {
            '@type': 'Person',
            name: metadata.author
        },
        description: metadata.description,
        category: `${category}/${subCategory}`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className='flex flex-shrink'>
                <Markdown content={content} metadata={metadata as FrontMatter} />
            </div>
        </>
    );
};

export interface pathInterface {
    category: string;
    subCategory: string;
    slug: string;
}

export async function generateStaticParams() {
    const postsDir = path.join(process.cwd(), 'public', 'posts');
    const paths: pathInterface[] = [];

    try {
        const categories = fs.readdirSync(postsDir);

        for (const category of categories) {
            const categoryPath = path.join(postsDir, category);
            if (!fs.statSync(categoryPath).isDirectory()) continue;

            const subCategories = fs.readdirSync(categoryPath);
            for (const subCategory of subCategories) {
                const subCategoryPath = path.join(categoryPath, subCategory);
                if (!fs.statSync(subCategoryPath).isDirectory()) continue;

                const files = fs.readdirSync(subCategoryPath);
                for (const file of files) {
                    if (file.endsWith('.md')) {
                        paths.push({
                            category,
                            subCategory,
                            // URL 인코딩된 slug 사용
                            slug: encodeURIComponent(file.replace('.md', ''))
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error generating static params:', error);
    }

    return paths;
}

// Metadata 생성 함수 추가
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { category, subCategory, slug } = await params;
    const filePath = path.join(
        process.cwd(),
        'public/posts',
        category,
        subCategory,
        `${slug}.md`
    );

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: metadata } = matter(fileContent);

    return {
        title: metadata.title || "CarefreeLife98's Tech Post Title",
        description: metadata.description || metadata.title || "CarefreeLife98's Tech Post",
        authors: [{ name: metadata.author || "CarefreeLife98" }],
        openGraph: {
            title: metadata.title || "CarefreeLife98's Tech Post Title",
            description: metadata.description || metadata.title || "CarefreeLife98's Tech Post",
            type: 'article',
            authors: metadata.author || "CarefreeLife98",
            publishedTime: metadata.date,
            images: metadata.thumbnail ? [
                {
                    url: metadata.thumbnail,
                    alt: metadata.title,
                }
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: metadata.title || "CarefreeLife98's Tech Post Title",
            description: metadata.description || metadata.title || "CarefreeLife98's Tech Post",
            images: metadata.thumbnail ? [metadata.thumbnail] : [],
        }
    };
}
