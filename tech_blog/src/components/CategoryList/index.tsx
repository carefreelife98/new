import './style.css';

interface CategoryListProps{
    categoryList: string[]
}

export default function CategoryList({categoryList}: CategoryListProps) {

    return (
        <div id='cfl-tech-blog-category-box'>
            {categoryList && categoryList.length > 0 &&
                categoryList.map((item, index) => {
                    return (
                        <div key={index} className='cfl-tech-blog-category'>
                            {item}
                        </div>
                    )
                })
            }
        </div>
    );
}
