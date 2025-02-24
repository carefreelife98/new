'use client'

import CategoryList from "@/components/CategoryList";
import TagList from "@/components/TagList";
import Link from "next/link";
import {FrontMatterWithFilePath} from "@/interfaces/frontmatter";
import {sendGAEvent} from "@next/third-parties/google";

interface Props {
    key: number;
    postMetaData: FrontMatterWithFilePath
}

export default function PostByCategoryCard({postMetaData, key}: Props) {

    const filepath = postMetaData.filepath;

    // "/posts/" 이후의 경로를 추출
    const relativePath = filepath.substring(filepath.indexOf('/posts/'));

    // ".md" 확장자 제거
    const url = relativePath.replace(/\.md$/, '');

    return (
        <Link key={key} href={url} onClick={() => sendGAEvent('event', 'buttonClicked', { value: url })}>
            <div
                className="flex flex-col gap-2 bg-gray-50 p-5 border border-gray-300 rounded-lg shadow-md hover:bg-black/10 cursor-pointer h-[400px]"> {/* 고정 높이 추가 */}
                {postMetaData.thumbnail && (
                    <div className="flex-2 w-full h-1/2 flex items-center justify-center overflow-hidden rounded-t-2xl">
                        <img
                            className="w-full h-full object-cover"
                            src={postMetaData.thumbnail}
                            alt="thumbnail_image"
                        />
                    </div>
                )}
                <div className="flex-1 flex flex-col gap-1 items-center justify-around">
                    <div className="font-gimhaegaya font-bold text-lg text-center line-clamp-2"> {/* 긴 제목 처리 */}
                        {postMetaData.title.toString()}
                    </div>
                    <div className="text-gray-500">{postMetaData.date}</div>
                    <div className="w-full flex overflow-x-auto gap-1 p-1">
                        {postMetaData.categories.length > 0 && (
                            <CategoryList categoryList={postMetaData.categories}/>
                        )}
                    </div>
                    <div className="w-full flex items-center justify-center overflow-x-auto gap-1 p-1">
                        {postMetaData.tags?.length > 0 && (
                            <TagList tagList={postMetaData.tags}/>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
};