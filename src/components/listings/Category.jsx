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
  const loc = useLocation();

  const [data, setData] = React.useState([]);
  const [title, setTitle] = React.useState({
    title: '',
    desc: '',
    pagination: [],
  });
  const [countries, setCountries] = React.useState([]);

  let currentPage = parseInt(searchParams[0].get('page'), 10) || 1;

  const fetchData = async () => {
    setData([]);
    const country = new URL(window.location.href).searchParams.get('country') || '';
    currentPage = parseInt(searchParams[0].get('page'), 10) || 1;
    window.scrollTo({ top: 0 });

    const [d, t, c] = await getData(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/category/${params.category}/${currentPage !== 1 ? currentPage : ''}&type=${new URL(window.location.href).searchParams.get('type')}&filter_country=${country}`, currentPage);
    setData(d);
    setTitle(t);
    setCountries(c);
  };

  React.useEffect(fetchData, [loc]);

  return (
    data.length ? (
      <CatContent
        data={data}
        title={title}
        currentPage={currentPage}
        countries={countries}
      />
    ) : <Loading />
  );
}

export default Category;
