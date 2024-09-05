import {Outlet, useLocation} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

export default function Container() {

    //         state: 현재 페이지의 path name 상태          //
    const {pathname} = useLocation();

    //         component: 레이아웃 렌더링          //
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
};
