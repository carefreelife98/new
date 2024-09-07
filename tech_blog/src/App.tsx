import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {MAIN_PATH, POST_DETAIL_PATH, POST_SUB_CAT_PATH} from "./constants";
import Container from "./layouts/Container";
import Main from "./views/Main";

function App() {
  return (
      <Routes>
        <Route element={<Container />}>
            <Route path={MAIN_PATH()} element={<Main />} />
            <Route path={POST_SUB_CAT_PATH(':subCategoryNumber')} element={<></>}></Route>
            <Route path={POST_DETAIL_PATH(':subCategoryNumber', ':postNumber')} element={<></>}></Route>
        </Route>
        <Route path='*' element={<h1>404 Not Found: URL 경로가 잘못 되었습니다.</h1>} />
      </Routes>
  );
}

export default App;
