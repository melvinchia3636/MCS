/* eslint-disable import/extensions */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useLocation, useSearchParams } from 'react-router-dom';

import Loading from '../utils/Loading.jsx';
import CatContent from './CatContent.jsx';

import getData from './scrape.js';

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

  const fetchData = async () => {
    setData([]);
    currentPage = parseInt(searchParams[0].get('page'), 10) || 1;
    window.scrollTo({ top: 0 });

    const [d, t] = await getData(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/${categoryMap[category]}/${currentPage}`, currentPage);
    setData(d);
    setTitle(t);
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
