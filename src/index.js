import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './style.css';

import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx";

const Index = () => {
  const [theme, setTheme] = React.useState(localStorage.theme);

  React.useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [])

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.theme = theme
  }, [theme])

  return <>
    <Navbar setTheme={setTheme} theme={theme} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </>;
};

ReactDOM.render(<Index />, document.getElementById("index"));