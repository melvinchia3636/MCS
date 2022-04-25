/* eslint-disable import/extensions */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useLocation, useSearchParams } from 'react-router-dom';

import Loading from '../../utils/components/Loading.jsx';
import CatContent from './CatContent.jsx';

import getData from './lib/getData.js';

function General({ category }) {
  const searchParams = useSearchParams();
  const location = useLocation();

  const [data, setData] = React.useState([]);
  const [title, setTitle] = React.useState({
    title: '',
    desc: '',
    pagination: [],
  });
  const [countries, setCountries] = React.useState([]);

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
    const country = new URL(window.location.href).searchParams.get('country') || '';
    currentPage = parseInt(searchParams[0].get('page'), 10) || 1;
    window.scrollTo({ top: 0 });

    const [d, t, c] = await getData(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/${categoryMap[category]}/${currentPage}&type=${new URL(window.location.href).searchParams.get('type')}&order_by=${['online_players', 'votes', 'server_id'][parseInt(new URL(window.location.href).searchParams.get('sort'), 10)]}&filter_country=${country}`, currentPage);
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
        hasSorting={category === 'java'}
      />
    ) : <Loading />
  );
}

General.propTypes = {
  category: PropTypes.string.isRequired,
};

export default General;
