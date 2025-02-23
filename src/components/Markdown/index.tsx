"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from "remark-gfm";
import CategoryList from "../CategoryList";
import TagList from "../TagList";
import {MarkdownProps} from "@/app/posts/[category]/[subCategory]/[slug]/page";
import {useState} from "react";
import TableOfContents from "@/components/TableOfContents";
import './style.css';

export default function Markdown({metadata, content}: MarkdownProps) {

    const [showToc, setShowToc] = useState(true);

    const onTocShowButtonClickHandler = () => {
        setShowToc(!showToc);
    }

    return (
        <div className="w-full h-full flex justify-center relative">
            <div className="w-full h-full flex flex-col items-start justify-around">
                {metadata && (
                    <div className="w-full flex flex-col items-start justify-center">
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col">
                                <div className="text-gray-500">{metadata.date}</div>
                                <h1 className="font-gimhaegaya">{metadata.title}</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                {metadata.categories && (
                                    <div
                                        className="w-full flex items-center justify-end overflow-x-auto gap-3 p-3 scrollbar-none">
                                        {metadata.categories.length > 0 && (
                                            <CategoryList categoryList={metadata.categories}/>
                                        )}
                                    </div>
                                )}
                                {metadata.tags && (
                                    <div
                                        className="w-full flex items-center justify-end overflow-x-auto gap-3 p-3 scrollbar-none">
                                        {metadata.tags.length > 0 && <TagList tagList={metadata.tags}/>}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="divider pb-10"/>
                    </div>
                )}
                <div className="markdown-content">
                    <ReactMarkdown
                        className="w-full max-w-full"
                        rehypePlugins={[
                            rehypeHighlight,
                            rehypeRaw,
                            rehypeSlug,
                            rehypeAutolinkHeadings,
                        ]}
                        remarkPlugins={[remarkGfm]}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
            <div className="sticky right-1 top-0 h-full w-[300px] z-100">
                <TableOfContents content={content}/>
            </div>
        </div>
    );
};
