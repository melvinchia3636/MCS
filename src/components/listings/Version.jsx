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
  const [countries, setCountries] = React.useState([]);

  let currentPage = parseInt(searchParams[0].get('page'), 10) || 1;

  const fetchData = async () => {
    setData([]);
    const country = new URL(window.location.href).searchParams.get('country') || '';
    currentPage = parseInt(searchParams[0].get('page'), 10) || 1;
    window.scrollTo({ top: 0 });

    const [d, t, c] = await getData(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/version/${params.version}/${currentPage}&filter_country=${country}`, currentPage);
    setData(d);
    setTitle(t);
    setCountries(c);
  };

  React.useEffect(fetchData, [location]);

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

export default Version;
