import './style.css';
import React from "react";
import {getPopularPosts} from "@/lib/MarkdownUtils";
import PopularPostCarousel from "@/components/PopularPosts/PopularPostCarousel";

export default function PopularPosts() {

    const latestPosts = getPopularPosts();

    return (
        <div className='flex flex-col w-full justify-flex-start gap-4'>
            <h2>{'👍🏻인기 TOP 포스트'}</h2>
            <PopularPostCarousel latestPosts={latestPosts}/>
        </div>
    );
};