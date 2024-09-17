import './App.css';
import {Route, Routes} from "react-router-dom";
import {MAIN_PATH, POST_BY_CAT_PATH, POST_DETAIL_PATH} from "./constants";
import Container from "./layouts/Container";
import Main from "./views/Main";
import PostsByCategory from "./views/PostsByCategory";
import PostDetail from "./views/PostDetail";
import {useEffect} from "react";
import ScrollToTop from "./components/ScrollToTop";

function App() {

    const trackPageView = () => {

    };

    useEffect(() => {

        trackPageView();
    }, []);

  return (
      <>
          <ScrollToTop />
          <Routes>
            <Route element={<Container />}>
                <Route path={MAIN_PATH()} element={<Main />} />
                <Route path={POST_BY_CAT_PATH(':categoryName', ':subCategoryName')} element={<PostsByCategory />} />
                <Route path={POST_DETAIL_PATH(':categoryName', ':subCategoryName', ':fileName')} element={<PostDetail />} />
            </Route>
            <Route path='*' element={<h1>404 Not Found: URL 경로가 잘못 되었습니다.</h1>} />
          </Routes>
      </>
  );
}

export default App;
