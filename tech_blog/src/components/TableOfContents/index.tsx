import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import './style.css';

// TocProps 인터페이스 정의
interface TocProps {
    type: string; // 태그 이름 (h1, h2 등)
    value: string; // 텍스트 값
    id: string; // 요소 ID
    level: number;
    items?: TocProps[]; // 하위 항목
}

export default function TableOfContents() {
    // state: 각 포스트 별 헤더 요소 상태
    const [headings, setHeadings] = useState<TocProps[]>([]);
    // state: toc 노출 여부
    const [isVisible, setIsVisible] = useState<boolean>(true);

    // function: 현재 경로 상태
    const {pathname} = useLocation()

    // function: TOC 표시/숨기기 토글 함수
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // 헤딩을 계층 구조로 만드는 함수
    function getNestedHeadings(headings: TocProps[]): TocProps[] {
        const result: TocProps[] = [];
        const stack: TocProps[] = [];

        headings.forEach((heading) => {
            // 스택의 마지막 항목
            while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
                stack.pop();
            }

            if (stack.length === 0) {
                // 최상위 항목에 추가
                result.push(heading);
            } else {
                // 마지막 항목의 items에 추가
                const parent = stack[stack.length - 1];
                parent.items = parent.items || [];
                parent.items.push(heading);
            }

            // 현재 항목을 스택에 추가
            stack.push(heading);
        });

        return result;
    }

    function H({ entry }: { entry: TocProps }) {
        return (
            <>
                <a
                    href={`#${entry.id}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick(entry.id);
                    }}
                    className="cfl-tech-blog-toc-link" // 링크에 클래스 추가

                >
                    <div className='cfl-tech-blog-toc-link-value'>
                        {entry.value}
                    </div>
                </a>
                {entry.items && (
                    <ul className="cfl-tech-blog-toc-sublist"> {/* 하위 항목에 대한 클래스 추가 */}
                        {entry.items.map((subEntry) => (
                            <li key={subEntry.id} className="cfl-tech-blog-toc-sublist-item"> {/* 하위 항목 li에 클래스 추가 */}
                                <H entry={subEntry} />
                            </li>
                        ))}
                    </ul>
                )}
            </>
        );
    }


    // 스크롤 이동 핸들러
    const handleClick = (id: string) => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" }); // 부드럽게 스크롤
        }
    };

    useEffect(() => {
        const targetDoc = document.getElementById("cfl-tech-blog-post-detail-wrapper");
        if (!targetDoc) return;

        // MutationObserver로 DOM 변화를 감지
        const observer = new MutationObserver(() => {
            const headingElements = Array.from(targetDoc.querySelectorAll("h1, h2, h3, h4, h5"));

            // 태그 이름과 텍스트 콘텐츠를 추출하여 배열 생성
            const tocPropList: TocProps[] = headingElements.map((heading, index) => {
                const id = `${heading.tagName.toLowerCase()}-${index}`; // 각 요소에 고유한 ID 생성
                heading.id = id; // 요소에 id 부여

                return {
                    type: heading.tagName.toLowerCase(),
                    value: heading.textContent || "",
                    id, // 고유한 id
                    level: parseInt(heading.tagName[1]), // 레벨 추출 (h1, h2 등에서 숫자 추출)
                };
            });

            const nestedHeadings = getNestedHeadings(tocPropList); // 계층 구조로 변환
            setHeadings(nestedHeadings);
        });

        // 대상 요소에 대해 MutationObserver 활성화
        observer.observe(targetDoc, { childList: true, subtree: true });

        // 컴포넌트 언마운트 시 observer를 정리
        return () => observer.disconnect();
    }, [pathname]);

    return (
        <>
            {/* TOC를 토글하는 버튼 */}
            <button className={isVisible ? 'cfl-tech-blog-toc-toggle-right' : 'cfl-tech-blog-toc-toggle-left'} onClick={toggleVisibility}></button>

            {/* TOC 사이드바 */}
            <nav
                aria-label="Table of Contents"
                className={`cfl-tech-blog-toc ${isVisible ? 'visible' : 'hidden'}`} // visible/hidden 상태에 따라 스타일 적용
            >
                <h3 className='cfl-tech-blog-toc-title'>{'AGENDA'}</h3>
                <ul className="cfl-tech-blog-toc-list">
                    {headings.map((heading) => (
                        <li key={heading.id} className="cfl-tech-blog-toc-list-item">
                            <H entry={heading} />
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
