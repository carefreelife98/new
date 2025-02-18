import './LayoutStyle.css';

import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import BlogSideBar from "../components/SideBar/BlogSideBar";
import { getMarkdownFileCount, getMarkdownFileCountByCategory } from "@/lib/MarkdownUtils";
import MarkdownFileCount from "@/interfaces/markdownFileCount";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata = {
    title: "CarefreeLife98's Tech Blog",
    description: "Managed by CarefreeLife98",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const totalCount = getMarkdownFileCount();
    const countBySubCategory = getMarkdownFileCountByCategory();

    const markdownFileCount: MarkdownFileCount = {
        total: totalCount,
        countsBySubCategory: countBySubCategory,
    };

    return (
        <html lang="en">
            <body className="bg-gray-50 text-gray-800">
                <SidebarProvider>
                    <div id="tech-blog-common-view" className="flex w-full min-w-[1440px]">
                        <BlogSideBar markdownFileCount={markdownFileCount}/>
                        <div className='flex flex-col'>
                            {/*<div className="flex flex-col gap-2 px-2 py-2 h-screen bg-white shadow-lg rounded-lg p-6 flex-grow">*/}
                                <Header />
                                <main>{children}</main>
                                <Footer/>
                            {/*</div>*/}
                        </div>
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}
