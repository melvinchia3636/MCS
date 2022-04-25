/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-cycle */
import React, { createContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import 'flagpack/src/flagpack.scss';

import Loading from '../../utils/components/Loading';
import Header from './components/Header';
import Buttons from './components/Buttons';
import ServerInfo from './components/serverInfo';
import ServerDescription from './components/ServerDescription';
import FAQ from './components/FAQ';
import ServerReviews from './components/ServerReviews';
import getData from './lib/getData';

export const DetailsContext = createContext({
  data: {},
  setData: () => { },
});

function Details() {
  const params = useParams();
  const location = useLocation();

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    setData({});
    getData(parseInt(params.id, 10)).then((d) => setData(d));
  }, [location]);

  return (
    <DetailsContext.Provider value={{ data, setData }}>
      {JSON.stringify(data) !== '{}' ? (
        <div className="py-12 min-h-[52vh] px-16 text-slate-700 dark:text-white transition-all duration-500">
          <Header />
          <Buttons />
          <ServerInfo />
          <ServerDescription />
          <FAQ />
          <ServerReviews />
        </div>
      ) : <Loading />}
    </DetailsContext.Provider>
  );
}

export default Details;
