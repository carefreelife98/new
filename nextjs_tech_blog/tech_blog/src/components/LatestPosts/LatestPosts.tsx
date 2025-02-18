import { getLatestMarkdownFiles } from "@/lib/MarkdownUtils";
import LatestPostCard from "@/components/LatestPosts/LatestPostCard";

export default function LatestPosts() {

    const latestPosts = getLatestMarkdownFiles();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h2>{'최근 게시된 글 🔥'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {latestPosts.map((file) => (
                    <LatestPostCard key={file.title} frontMatter={file} />
                ))}
            </div>
        </div>
    );
}
