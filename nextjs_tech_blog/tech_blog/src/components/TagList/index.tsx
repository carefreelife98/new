import './style.css';
import {Tags, TagsBackground} from "@/_constants/tags";
import {Badge} from "@/components/ui/badge";

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

    function getTagBackgroundColor(tagName: string): string | undefined {
        return TagsBackground[tagName as keyof typeof Tags];
    }

    return (
        <div className="w-full flex items-center justify-center gap-1.25 flex-wrap overflow-hidden">
            {tagList && tagList.length > 0 &&
                tagList.map((item, index) => {
                    return (
                        <div key={index}>
                            <Badge variant="outline" style={{color: `${getTagColor(item)}`, backgroundColor: `${getTagBackgroundColor(item)}`}}>{item}</Badge>
                        </div>
                    )
                })
            }
        </div>
    );
}
