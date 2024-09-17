import './style.css';
import config from '../../tech_blog_config.json';
import {useEffect, useState} from "react";
import "highlight.js/styles/a11y-dark.css";
import Markdown from "../../components/Markdown";
import PostMarkdown from "../../interfaces/postMarkdown";
import PopularPosts from "./PopularPosts";

export default function Main() {

    const [markdownProps, setMarkdownProps] = useState<PostMarkdown | null>(null);

    useEffect(() => {

        const category = config.writer_info.markdown.category;
        const subCategory = config.writer_info.markdown.subcategories[0];
        const filename = config.writer_info.markdown.filename;

        const testProps: PostMarkdown = {
            category: category,
            subCategory: subCategory,
            fileName: filename
        };

        setMarkdownProps(testProps);

    }, []);

    return (
        <div id='cfl-tech-blog-main-page-wrapper'>
            <div className='cfl-tech-blog-main-page-container'>
                <div className='cfl-tech-blog-main-page-content-box'>
                    {markdownProps &&
                        <Markdown category={markdownProps.category} subCategory={markdownProps.subCategory} fileName={markdownProps.fileName} />
                    }
                    <PopularPosts />
                </div>
            </div>
        </div>
    );
}
