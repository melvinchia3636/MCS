/* eslint-disable import/extensions */
/* eslint-disable global-require */
import React from 'react';
import {
  useParams, useSearchParams, useLocation,
} from 'react-router-dom';

import Loading from '../utils/Loading.jsx';
import CatContent from './CatContent.jsx';

import getData from './scrape.js';

function Category() {
  const params = useParams();
  const searchParams = useSearchParams();
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

    const [d, t] = await getData(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/category/${params.category}/${currentPage !== 1 ? currentPage : ''}`, currentPage);
    setData(d);
    setTitle(t);
  };

  React.useEffect(fetchData, [location]);

  return (
    data.length ? <CatContent data={data} title={title} currentPage={currentPage} /> : <Loading />
  );
}

export default Category;
