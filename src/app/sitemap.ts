import {generateStaticParams} from "@/app/posts/[category]/[subCategory]/[slug]/page";
import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://carefreelife98.github.io/new';
    try {
        const posts = await generateStaticParams();  // public/posts 디렉토리를 순회하여 모든 포스트 정보를 가져오는 함수
        return posts.map(post => ({
            url: `${baseUrl}/posts/${encodeURIComponent(post.category)}/${encodeURIComponent(post.subCategory)}/${encodeURIComponent(post.slug)}`,
            // lastModified: post.date,
        }));
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return [];
    }
}
