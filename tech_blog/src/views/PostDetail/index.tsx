import PostMarkdown from "../../interfaces/postMarkdown";
import {useEffect, useState} from "react";
import Markdown from "../../components/Markdown";
import {useParams} from "react-router-dom";

export default function PostDetail() {

    const {categoryName, subCategoryName, fileName} = useParams();

    const [markdownProps, setMarkdownProps] = useState<PostMarkdown | null>(null);

    useEffect(() => {
        if (!(categoryName && subCategoryName && fileName)) return;

        const detailProps: PostMarkdown = {
            category: categoryName,
            subCategory: subCategoryName,
            fileName: fileName
        };

        setMarkdownProps(detailProps);

    }, [categoryName, subCategoryName, fileName]);

    return (
        <div id='cfl-tech-blog-post-detail-wrapper'>
            <div className='cfl-tech-blog-post-detail-container'>
                <div className='cfl-tech-blog-post-detail-content-box'>
                    {markdownProps &&
                        <Markdown category={markdownProps.category} subCategory={markdownProps.subCategory} fileName={markdownProps.fileName} />
                    }
                </div>
            </div>
        </div>
    );
};
