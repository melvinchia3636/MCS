/* eslint-disable import/extensions */
import React from 'react';
import {
  useSearchParams, useLocation, useParams,
} from 'react-router-dom';

import Loading from '../utils/Loading.jsx';
import CatContent from './CatContent.jsx';

import getData from './scrape.js';

function Version() {
  const searchParams = useSearchParams();
  const params = useParams();
  const location = useLocation();

  const [data, setData] = React.useState([]);
  const [title, setTitle] = React.useState({
    title: '',
    desc: '',
    pagination: [],
  });

  let currentPage = parseInt(searchParams[0].get('page'), 10) || 1;

  const fetchData = async () => {
    setData([]);
    currentPage = parseInt(searchParams[0].get('page'), 10) || 1;
    window.scrollTo({ top: 0 });

    const [d, t] = await getData(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/version/${params.version}/${currentPage}`, currentPage);
    setData(d);
    setTitle(t);
  };

  React.useEffect(fetchData, [location]);

  return (
    data.length ? <CatContent data={data} title={title} currentPage={currentPage} /> : <Loading />
  );
}

export default Version;
