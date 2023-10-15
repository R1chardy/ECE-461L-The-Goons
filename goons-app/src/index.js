import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './LoginPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from './Projects'
// import Login from './components/Login';

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Home />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
