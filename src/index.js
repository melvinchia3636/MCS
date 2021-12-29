import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './style.css';

import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx"

const Index = () => {
  return <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </>;
};

ReactDOM.render(<Index />, document.getElementById("index"));