/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
import React from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Loading from '../../utils/components/Loading.jsx';
import CatContent from '../listings/CatContent.jsx';
import getData from '../listings/lib/getData.js';

function SearchResults() {
  const searchParams = useSearchParams();
  const location = useLocation();

  const [data, setData] = React.useState(null);
  const [title, setTitle] = React.useState({
    title: '',
    desc: '',
    pagination: [],
  });
  const [countries, setCountries] = React.useState([]);

  let currentPage = parseInt(searchParams[0].get('page'), 10) || 1;

  const fetchData = async () => {
    setData(null);
    const country = new URL(window.location.href).searchParams.get('country') || '';
    const query = new URL(window.location.href).searchParams.get('q') || '';
    currentPage = parseInt(searchParams[0].get('page'), 10) || 1;
    window.scrollTo({ top: 0 });

    const [d, t, c] = await getData(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/search/${query}/${currentPage}&type=${new URL(window.location.href).searchParams.get('type')}&filter_country=${country}`, currentPage);
    t.title = (
      <span className="text-zinc-700">
        Search results for
        {' '}
        <span className="text-amber-400">{query}</span>
      </span>
    );
    t.desc = '';
    setData(d);
    setTitle(t);
    setCountries(c);
  };

  React.useEffect(fetchData, [location]);

  return (
    data !== null ? (
      data.length ? (
        <CatContent
          data={data}
          title={title}
          currentPage={currentPage}
          countries={countries}
          hasSorting={false}
        />
      ) : <p className="text-zinc-700 dark:text-white text-2xl">No results were found.</p>
    ) : <Loading />
  );
}

export default SearchResults;
