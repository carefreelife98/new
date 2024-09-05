import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {MAIN_PATH} from "./constants";
import Container from "./layouts/Container";
import Main from "./views/Main";

function App() {
  return (
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
        </Route>
        <Route path='*' element={<h1>404 Not Found: URL 경로가 잘못 되었습니다.</h1>} />
      </Routes>
  );
}

export default App;
