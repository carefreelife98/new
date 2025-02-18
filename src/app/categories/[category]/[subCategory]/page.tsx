import techBlogConfig from '../../../../../tech_blog_config.json';
import path from "path";
import fs from "fs";
import fm from "front-matter";
import FrontMatter, {FrontMatterWithFilename} from "@/interfaces/frontmatter";
import CategoryList from "../../../../components/CategoryList";
import TagList from "../../../../components/TagList";
import Link from "next/link";

type Params = Promise<{
    category: string;
    subCategory: string;
}>;

export interface PostsByCategoryPageProps {
    params: Params;
}

export default async function PostsByCategory({params}: PostsByCategoryPageProps) {

    const { category, subCategory } = await params;
    const directoryPath = path.join(process.cwd(), 'public', 'posts', category, subCategory);
    let postMetaDataList: FrontMatterWithFilename[] = [];
    let totalCount = 0;

    if (fs.existsSync(directoryPath)) {
        // 해당 서브 카테고리 내의 모든 마크다운 파일 탐색
        const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.md'));
        totalCount = files.length;
        postMetaDataList = files.map(file => {
            const filePath = path.join(directoryPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const frontMatter = fm(fileContent).attributes as FrontMatter; // Front Matter와 본문 분리

            return {...frontMatter, filename: file};
        })
    }

    return (
        <div className="w-full h-full flex-7 flex items-center justify-center">
            {postMetaDataList && postMetaDataList.length > 0 ? (
                <div className='w-full flex-col'>
                    <div className="w-full flex gap-5 items-center justify-between">
                        <h1 className="font-gimhaegaya rounded-t-2xl rounded-b-2xl px-4 py-2 bg-black/10">
                            {subCategory}
                        </h1>
                        <div
                            className="flex items-center justify-center font-gimhaegaya font-extrabold text-base gap-2">
                            <div
                                className="flex items-center justify-center rounded-full w-10 h-10 px-4 py-2 bg-black/10">
                                {totalCount}
                            </div>
                            <div className="flex text-center items-center justify-center">
                                가지의 포스팅이 있어요!
                            </div>
                        </div>
                    </div>
                    <div className="divider my-4"></div>
                    <div className="w-full h-full flex flex-col">
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(20%,1fr))] gap-4 p-4">
                            {postMetaDataList &&
                                category &&
                                subCategory &&
                                postMetaDataList.map((postMetaData, index) => {
                                    return (
                                        <Link key={index} href={`/posts/${category}/${subCategory}/${postMetaData.filename.replace(".md", "")}`}>
                                            <div className="flex flex-col gap-2 bg-gray-50 p-5 border border-gray-300 rounded-lg shadow-md hover:bg-black/10 cursor-pointer">
                                                {postMetaData.teaser && (
                                                    <div className="flex-2 w-full flex items-center justify-center">
                                                        <img
                                                            className="rounded-t-2xl rounded-b-2xl w-full h-full object-cover"
                                                            src={postMetaData.teaser}
                                                            alt="teaser_image"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 flex flex-col gap-1 items-center justify-around">
                                                    <div className="font-gimhaegaya font-bold text-lg">
                                                        {postMetaData.title.toString()}
                                                    </div>
                                                    <div className="text-gray-500">{postMetaData.date}</div>
                                                    <div className="w-full flex overflow-x-auto gap-1 p-1">
                                                        {postMetaData.categories.length > 0 && (
                                                            <CategoryList categoryList={postMetaData.categories}/>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="w-full flex items-center justify-center overflow-x-auto gap-1 p-1">
                                                        {postMetaData.tags.length > 0 && (
                                                            <TagList tagList={postMetaData.tags}/>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full flex justify-items-start">{'해당 데이터가 존재하지 않습니다.'}</div>
            )}
        </div>

    );
}
interface pathInterface {
    category: string;
    subCategory: string;
}

export async function generateStaticParams() {
    const paths: pathInterface[] = [];

    // config.posts.categories 배열을 순회합니다.
    techBlogConfig.posts.categories.forEach((item) => {
        const { category, subcategories } = item;
        subcategories.forEach((subCategory) => {
            paths.push({
                category,
                subCategory,
            });
        });
    });

    return paths;
}
