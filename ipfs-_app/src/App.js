import './App.css';
import React from 'react';

// コンポーネント
import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";
import Home from './Components/home';
import Fileup_loader from './Components/file_loader';
import File_view from './Components/file_view';
import NotFound from './Components/404';


function App() {
  return (
    < div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploader" element={<Fileup_loader/>} />
          <Route path="/views" element={<File_view/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
    </ div>
  );
}

export default App;

