import fs from 'fs';
import path from 'path';
import matter from "gray-matter";
import FrontMatter, {FrontMatterWithFilePath} from "@/interfaces/frontmatter";

export function getFrontMatterByPath(filePath: string) {
    const target = fs.readFileSync(filePath, "utf-8");
    const {data} = matter(target);
    const frontMatter: FrontMatter = {
        title: data.title || "CarefreeLife98's Tech Post Title",
        author: data.author || "CarefreeLife98",
        description: data.description || data.title || "CarefreeLife98's Tech Post",
        date: data.date || "1998-01-16",
        categories: data.categories || [],
        tags: data.tags || [],
        thumbnail: data.thumbnail || "",
    };

    return frontMatter;
}

export function getPopularPosts(): FrontMatterWithFilePath[] {
    const filePath = path.join(process.cwd(), 'public', 'posts', 'Main', 'popular');
    const popularPostPaths = getAllMarkdownFiles(filePath).map(filePath => {
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContents); // Frontmatter 데이터 추출
        const frontMatter: FrontMatterWithFilePath = {
            filepath: filePath,
            title: data.title || "CarefreeLife98's Tech Post Title",
            author: data.author || "CarefreeLife98",
            description: data.description || data.title || "CarefreeLife98's Tech Post",
            date: data.date || "1998-01-16",
            categories: data.categories || [],
            tags: data.tags || [],
            thumbnail: data.thumbnail || "",
        };

        return frontMatter;
    })

    return popularPostPaths;
}

// 모든 Markdown 파일 경로를 재귀적으로 읽기
export function getAllMarkdownFiles(dir: string): string[] {
    let files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(getAllMarkdownFiles(fullPath)); // 디렉토리 내부 탐색
        } else if (entry.isFile() && fullPath.endsWith(".md")) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * public/posts 폴더 하위의 모든 Markdown 파일 중 최근 5개 반환.
 */
export function getLatestMarkdownFiles(): FrontMatterWithFilePath[] {
    const postsDir = path.join(process.cwd(), "public/posts");

    // 모든 Markdown 파일 경로 가져오기
    const markdownFiles = getAllMarkdownFiles(postsDir);

    // 파일에서 Frontmatter의 date 추출 및 정렬
    const recentFiles = markdownFiles
        .map((filePath) => {
            const fileContents = fs.readFileSync(filePath, "utf-8");
            const { data } = matter(fileContents); // Frontmatter 데이터 추출
            const frontMatter: FrontMatterWithFilePath = {
                filepath: filePath.replace(postsDir, "posts").replace(/\.md$/, ""),
                title: data.title || "CarefreeLife98's Tech Post Title",
                author: data.author || "CarefreeLife98",
                description: data.description || data.title || "CarefreeLife98's Tech Post",
                date: data.date || "1998-01-16",
                categories: data.categories || [],
                tags: data.tags || [],
                thumbnail: data.thumbnail || "",
            };
            return frontMatter;
        })
        .filter((file) => file.date) // date가 없는 파일 제외
        // 최신 순 정렬
        .sort((a, b) => {
            const parseDate = (dateStr: string) => {
                const [year, month, day] = dateStr.split('. ').map((part) => part.trim());
                return new Date(`20${year}-${month}-${day}`);
            };

            return parseDate(b.date).getTime() - parseDate(a.date).getTime();
        })
        .slice(0, 8); // 최근 5개 선택

    return recentFiles;
}

/**
 * public/posts 폴더 하위의 모든 Markdown 파일 개수 반환
 */
export const getMarkdownFileCount = (): number => {
    const postsDirPath = path.join(process.cwd(), 'public', 'posts');

    const countFiles = (dirPath: string): number => {
        const files = fs.readdirSync(dirPath, { withFileTypes: true });

        return files.reduce((count, file) => {
            const filePath = path.join(dirPath, file.name);

            if (file.isDirectory()) {
                return count + countFiles(filePath); // 하위 디렉토리 재귀 탐색
            } else if (file.isFile() && file.name.endsWith('.md')) {
                return count + 1; // Markdown 파일 개수 추가
            }

            return count;
        }, 0);
    };

    return countFiles(postsDirPath);
};

/**
 * public/posts 디렉토리 하위 각 최하위 카테고리 디렉토리의 Markdown 파일 개수를 반환
 * @returns {Record<string, number>} 각 카테고리 디렉토리 이름과 Markdown 파일 개수
 */
export const getMarkdownFileCountByCategory = (): Record<string, number> => {
    const postsDir = path.join(process.cwd(), 'public', 'posts');

    const countMarkdownFiles = (dir: string): Record<string, number> => {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        const result: Record<string, number> = {};

        files.forEach((file) => {
            const filePath = path.join(dir, file.name);

            if (file.isDirectory()) {
                // 하위 디렉토리 탐색
                const subResult = countMarkdownFiles(filePath);

                // 최하위 디렉토리에 대해서만 파일 개수를 저장
                if (Object.keys(subResult).length > 0) {
                    Object.assign(result, subResult);
                }
            } else if (file.isFile() && file.name.endsWith('.md')) {
                // 최하위 디렉토리에 Markdown 파일 개수 누적
                const categoryName = path.basename(dir);
                result[categoryName] = (result[categoryName] || 0) + 1;
            }
        });

        return result;
    };

    return countMarkdownFiles(postsDir);
};