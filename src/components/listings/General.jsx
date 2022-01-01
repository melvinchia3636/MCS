/* eslint-disable import/extensions */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useLocation, useSearchParams } from 'react-router-dom';

import Loading from './Loading.jsx';
import CatContent from './CatContent.jsx';

function General({ category }) {
  const searchParams = useSearchParams();
  const location = useLocation();

  const [data, setData] = React.useState([]);
  const [title, setTitle] = React.useState({
    title: '',
    desc: '',
    pagination: [],
  });

  const categoryMap = {
    java: 'servers',
    bedrock: 'bedrock',
    new: 'new-minecraft-servers',
    popular: 'popular-minecraft-servers',
    whitelist: 'whitelist',
  };

  let currentPage = parseInt(searchParams[0].get('page'), 10) || 1;

  const fetchData = () => {
    setData([]);
    currentPage = parseInt(searchParams[0].get('page'), 10) || 1;
    window.scrollTo({ top: 0 });
    fetch(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/${categoryMap[category]}/${currentPage}`).then((res) => res.text()).then((raw) => {
      const HTMLParser = new DOMParser();
      const html = HTMLParser.parseFromString(raw, 'text/html');
      const d = Array.from(html.querySelectorAll('.server-row')).map((e) => ({
        thumbnail: e.querySelector('img[src*=favicon]').src,
        banner: e.querySelector('img[src*=banner]').src,
        ip: e.querySelector('.ip-block').innerText,
        version: e.querySelector("span[title='Server Version']").innerText.trim(),
        gamemode: e.querySelector("span[title='Main Gamemode']").innerText.trim(),
        playersOnline: e.querySelector("span[title='Players Online']")?.innerText?.trim() || 'Not Available',
        serverType: e.querySelector("span[title='Server Type']").innerText.trim(),
        rating: e.querySelectorAll('.fa-star').length,
        status: e.querySelector('.badge.fs-6')?.innerText?.trim(),
      }));
      const t = {
        title: html.querySelector('h1').innerText.trim(),
        desc: html.querySelector('h1').nextElementSibling.innerText.trim(),
        pagination: Array.from(html.querySelectorAll('.pagination .page-link')).map((e) => e.innerText.trim()),
      };
      setTitle(t);
      setData(d);
    });
  };

  React.useEffect(fetchData, [location]);

  return (
    data.length ? <CatContent data={data} title={title} currentPage={currentPage} /> : <Loading />
  );
}

General.propTypes = {
  category: PropTypes.string.isRequired,
};

export default General;
