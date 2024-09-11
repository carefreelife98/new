import './style.css';
import {Outlet, useLocation} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../../components/SideBar";
import {useEffect, useState} from "react";
import {POST_BY_CAT_PATH, POST_DETAIL_PATH} from "../../constants";
import TableOfContents from "../../components/TableOfContents";

export default function Container() {

    // state: TOC 노출을 위한 포스트 상세 페이지 여부 상태
    const [isPostDetailPath, setIsPostDetailPath] = useState<boolean>(false);

    // function: path 상태
    const {pathname} = useLocation();

    useEffect(() => {
        // 포스트 상세 경로인 경우 상태 저장.
        if (pathname.endsWith('.md')) {
            setIsPostDetailPath(true);
        }else setIsPostDetailPath(false);

    }, [pathname]);

    //         component: 레이아웃 렌더링          //
    return (
        <div id='cfl-tech-blog-common-view'>
            <Header/>
            <div className='sidebar-main-container'>
                <SideBar />
                <Outlet/>
                {isPostDetailPath &&
                    <TableOfContents />
                }
            </div>
            <Footer/>
        </div>
    );
};
