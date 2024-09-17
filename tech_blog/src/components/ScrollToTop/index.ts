import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // 스크롤을 최상단으로 이동
    }, [pathname]); // 경로가 변경될 때마다 실행

    return null; // 이 컴포넌트는 UI에 렌더링되지 않음
}
