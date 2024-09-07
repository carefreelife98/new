import './style.css';
import config from '../../tech_blog_config.json';
import {useEffect, useState} from "react";
import "highlight.js/styles/a11y-dark.css";
import Markdown from "../../components/Markdown";
import PostMarkdown from "../../interfaces/postMarkdown";

export default function Main() {

    const [markdownProps, setMarkdownProps] = useState<PostMarkdown | null>(null);

    useEffect(() => {

        const category = config.posts.categories[0];
        const subCategory = category.subcategories;

        const testProps: PostMarkdown = {
            category: category.category,
            subCategory: subCategory[0],
            fileName: 'test-markdown.md'
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
                </div>
            </div>
        </div>
    );
}
