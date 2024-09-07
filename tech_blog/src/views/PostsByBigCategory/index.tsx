import config from '../../tech_blog_config.json';

export default function PostsByBigCategory(bigCategoryName: string) {

    const categoryList = config.posts.categories;
    const targetCategory = categoryList.map((category, index) => {
        if (category.category === bigCategoryName) return;
    });

    return (
        <> </>
    );
}
