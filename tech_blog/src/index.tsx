import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      {/* PUBLIC_URL 은 package.json의 homepage URL값으로 설정됨 */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
      </BrowserRouter>
  </React.StrictMode>
);