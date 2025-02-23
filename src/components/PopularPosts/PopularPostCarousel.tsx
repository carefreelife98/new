"use client";

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import FrontMatter from "@/interfaces/frontmatter";
import TagList from "@/components/TagList";

interface PopularPostCarouselProps {
    latestPosts: FrontMatter[];
}

export default function PopularPostCarousel({latestPosts}: PopularPostCarouselProps) {

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {latestPosts.map((frontMatter, index) => (
                    <CarouselItem key={index} >
                        <Card className="flex flex-col h-[720px]">
                            <CardHeader className="flex-1 flex items-center justify-center h-[560px]">
                                {frontMatter.thumbnail && (
                                    <div className="relative w-full h-full" aria-description="thumbnail">
                                        <Image
                                            className="object-cover w-full h-full"
                                            src={frontMatter.thumbnail}
                                            alt={`${frontMatter.title}-thumbnail`}
                                            layout="fill" // 부모의 크기에 맞춤
                                        />
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="flex-4 flex flex-col items-center justify-center h-[180px]">
                                <CardTitle className="text-center">{frontMatter.title}</CardTitle>
                                <CardDescription className="text-center">{frontMatter.date}</CardDescription>
                                {frontMatter.categories &&
                                    frontMatter.categories.map((category, index) => (
                                        <div key={index} className="text-center">
                                            <Badge variant="outline">{category}</Badge>
                                        </div>
                                    ))
                                }
                                {frontMatter.tags &&
                                    <TagList tagList={frontMatter.tags} />
                                }
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}