/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';

import Home from './pages/home';

import Navbar from './utils/components/Navbar.jsx';
import Footer from './utils/components/Footer.jsx';
import NotFound from './utils/components/404.jsx';

import Category from './pages/listings/Category.jsx';
import Version from './pages/listings/Version.jsx';
import General from './pages/listings/General.jsx';

import Details from './pages/details';
import Search from './pages/search';

function Index() {
  const [theme, setTheme] = React.useState(localStorage.theme);

  React.useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = theme;
  }, [theme]);

  return (
    <main className="bg-white dark:bg-zinc-700 transition-all duration-500 font-[Quicksand] font-light">
      <BrowserRouter>
        <Navbar setTheme={setTheme} theme={theme} />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />

          <Route path="/category/:category" element={<Category />} />
          <Route path="/version/:version" element={<Version />} />
          {['java', 'bedrock', 'new', 'popular', 'whitelist']
            .map((e) => <Route path={`/${e}`} element={<General category={e} />} />)}
          {['java', 'bedrock', 'new', 'popular', 'whitelist']
            .map((e) => <Route path={`/${e}/:page`} element={<General category={e} />} />)}
          <Route path="/server/:id" element={<Details />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
