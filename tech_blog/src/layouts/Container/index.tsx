import './style.css';
import {Outlet} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../../components/SideBar";

export default function Container() {

    //         component: 레이아웃 렌더링          //
    return (
        <div id='cfl-tech-blog-common-view'>
            <Header/>
            <div className='sidebar-main-container'>
                <SideBar />
                {/*<div className='divider-vertical'></div>*/}
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};
