'use client';

import './style.css';
import { useState } from 'react';
import config from '../../../tech_blog_config.json';
import MarkdownFileCount from "@/interfaces/markdownFileCount";
import {useRouter} from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarTrigger
} from "@/components/ui/sidebar";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";


interface SideBarProps {
    markdownFileCount: MarkdownFileCount;
}

export default function BlogSideBar({markdownFileCount}: SideBarProps) {

    const [totalPostCount] = useState<number>(markdownFileCount ? markdownFileCount.total : 0);
    const router = useRouter();

    const handleNavigate = (category: string, subCategory: string) => {
        // 특정 경로로 이동
        router.push(`/categories/${category}/${subCategory}`);
    };

    return (
        <div className='flex'>
            <Sidebar variant='floating' collapsible='offcanvas'>
                <SidebarHeader>
                    <div className='cfl-tech-blog-sidebar-author-info-box'>
                        <div className='cfl-tech-blog-sidebar-author-profile-image-box'>
                            <img className='cfl-tech-blog-sidebar-author-profile-image'
                                 src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/author.jpeg`} alt='author-image'/>
                        </div>
                        <div className='cfl-tech-blog-sidebar-author-desc-box'>
                            <div className='cfl-tech-blog-sidebar-author-name'>
                                {config.writer_info.job ? config.writer_info.job : ""}
                            </div>
                            <div className='cfl-tech-blog-sidebar-author-name'>
                                {config.writer_info.name ? config.writer_info.name : ""}
                            </div>
                            <div className='cfl-tech-blog-sidebar-author-desc'>
                                {config.writer_info.description ? config.writer_info.description : ""}
                            </div>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent className='h-full'>
                    <SidebarGroup>
                        <SidebarGroupLabel className='flex text-center justify-between'>Total Posts <span className='text-blue-500'>{totalPostCount}</span></SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {config.posts.categories.map((category, index) => (
                                    <Collapsible key={index} defaultOpen className="group/collapsible">
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton className='font-bold'>{category.category}</SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {category.subcategories.map((subCategory, index) => (
                                                    <SidebarMenuSubButton className='cursor-pointer' key={subCategory} onClick={() => handleNavigate(category.category, subCategory)}>{subCategory}</SidebarMenuSubButton>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarTrigger variant="outline" className='relative top-2 left-1'/>
        </div>
    );
}
