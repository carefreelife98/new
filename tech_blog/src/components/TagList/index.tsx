import './style.css';
import {Tags} from "../../constants/tags";

interface TagListProps{
    tagList: string[]
}

export default function TagList({tagList}: TagListProps) {

    /**
     * 주어진 태그 이름에 해당하는 enum 값(색상 코드)을 반환.
     * @param tagName - 찾고자 하는 태그 이름
     * @returns enum의 값(색상 코드) 또는 태그가 존재하지 않을 경우 undefined
     */
    function getTagColor(tagName: string): string | undefined {
        return Tags[tagName as keyof typeof Tags];
    }

    return (
        <div id='cfl-tech-blog-tag-box'>
            {tagList && tagList.length > 0 &&
                tagList.map((item, index) => {
                    console.log(getTagColor(item));
                    return (
                        // Tag enum 에 정의된 tag 값에 따라 컬러 설정.
                        <div key={index} className='cfl-tech-blog-tag' style={{color: `${getTagColor(item)}`}}>
                            {item}
                        </div>
                    )
                })
            }
        </div>
    );
}
