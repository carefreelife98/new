"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FrontMatterWithFilePath} from "@/interfaces/frontmatter";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import TagList from "@/components/TagList";

interface LatestPostCardProps {
    frontMatter: FrontMatterWithFilePath;
}

export default function LatestPostCard({frontMatter}: LatestPostCardProps) {

    const router = useRouter();
    const {toast} = useToast();

    const onPostCardClickHandler = () => {
        if (!frontMatter.filepath) {
            toast({
                title: "해당 포스트를 찾을 수 없어요!",
                description: "새로고침 후 다시 시도해주세요.",
            })
            return;
        }
        router.push(frontMatter.filepath);
    }

    return (
        <Card className='flex flex-col items-center justify-between gap-4 hover:bg-gray-100 cursor-pointer contain-layout contain-paint relative' onClick={onPostCardClickHandler}>
            <CardHeader className='flex-1 flex items-center justify-center'>
                {frontMatter.teaser &&
                    <div className='relative' aria-description='teaser'>
                        <Image className='min-h-20'
                               src={frontMatter.teaser}
                               alt={`${frontMatter.title}-teaser`}
                               width={0}
                               height={0}
                               sizes="50vw"
                        />
                    </div>
                }
            </CardHeader>
            <CardContent className='flex flex-1 flex-col items-center justify-center gap-1.5'>
                <CardTitle className='text-center overflow-hidden overflow-ellipsis'>{frontMatter.title}</CardTitle>
                <CardDescription>{frontMatter.date}</CardDescription>
                {frontMatter.categories &&
                    frontMatter.categories.map((category, index) => {
                        return (
                            <div key={index}>
                                <Badge variant="outline">{category}</Badge>
                            </div>
                        )
                    })
                }
                <TagList tagList={frontMatter.tags} />
            </CardContent>
        </Card>
    );
}