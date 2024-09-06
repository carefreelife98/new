import {Outlet} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../../components/SideBar";

export default function Container() {

    //         state: 현재 페이지의 path name 상태          //
    // const {pathname} = useLocation();

    //         component: 레이아웃 렌더링          //
    return (
        <>
            <Header/>
            <div id='sidebar-wrapper'>
                <div className='sidebar-container'>
                    <SideBar />
                </div>
                <Outlet/>
            </div>
            <Footer/>
        </>
    );
};
