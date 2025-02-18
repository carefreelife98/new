import React from "react";
import "highlight.js/styles/a11y-dark.css";
import './globals.css';
import PopularPosts from "../components/PopularPosts";
import LatestPosts from "@/components/LatestPosts/LatestPosts";

export default function MainPage() {

    return (
        <div id='main-page-container' className='flex'>
            <div id='main-page-wrapper' className='flex flex-col w-full gap-[100px] align-center justify-around'>
                <img
                    className="object-cover w-full h-full"
                    src={'https://capsule-render.vercel.app/api?type=waving&text=CarefreeLife!&color=gradient'}
                    alt={'carefree-life-logo'}
                    width={1000}
                    height={1000}
                    style={{objectFit: "contain"}}
                />
                <PopularPosts />
                <LatestPosts />
            </div>
        </div>
    );
}
