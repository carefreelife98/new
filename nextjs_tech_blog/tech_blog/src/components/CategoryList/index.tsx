import './style.css';
import {Badge} from "@/components/ui/badge";

interface CategoryListProps{
    categoryList: string[]
}

export default function CategoryList({categoryList}: CategoryListProps) {

    return (
        <div id='cfl-tech-blog-category-box'>
            {categoryList && categoryList.length > 0 &&
                categoryList.map((category, index) => {
                    return (
                        <div key={index}>
                            <Badge variant="outline">{category}</Badge>
                        </div>
                    )
                })
            }
        </div>
    );
}
