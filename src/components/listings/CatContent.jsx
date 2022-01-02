/* eslint-disable import/extensions */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import 'flagpack/src/flagpack.scss';

import CountryChooser from './CountryChooser.jsx';

function CatContent({
  title, data, currentPage, countries,
}) {
  const [isCountryChooserOpen, toggleCountryChooser] = React.useState(false);
  const [countryFilter, setCountryFilter] = React.useState('');

  const currentCountry = new URL(window.location.toString()).searchParams.get('country');

  return (
    <>
      <div className="py-12 min-h-[52vh] px-16 font-[QuickSand] text-slate-700 dark:text-white transition-all duration-500">
        <h1 className="font-medium text-4xl mb-3 text-amber-400">{title.title}</h1>
        <p className="text-lg tracking-wide">{title.desc}</p>
        <div className="mt-4 flex gap-3">
          <a href={data.website} target="_blank" rel="noreferrer" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-slate-100 hover:bg-slate-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
            <Icon icon="uil:sort" className="w-6 h-6" />
            Sort by: None
          </a>
          <button onClick={() => toggleCountryChooser(true)} type="button" href={data.website} target="_blank" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-slate-100 hover:bg-slate-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
            <Icon icon="uil:globe" className="w-6 h-6" />
            Country:
            {' '}
            {currentCountry ? <span className={`fp fp-square fp-large !w-6 !h-6 rounded-full ${currentCountry.toLowerCase()}`} /> : ''}
            {(countries.filter((e) => e[1] === currentCountry)[0] || [])[0] || 'All'}
          </button>
          <a href={data.website} target="_blank" rel="noreferrer" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-slate-100 hover:bg-slate-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
            <Icon icon="uil:server" className="w-6 h-6" />
            Server Type: All
          </a>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-8">
          {data.length ? data.map((e) => (
            <Link to={`/server/${e.id}`} className="block w-full overflow-hidden rounded-xl shadow-[0_6px_12px_rgba(0,0,0,.15)] bg-white hover:duration-100 hover:bg-slate-50 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 w-full">
                    <img alt={e.ip} src={e.thumbnail} className="w-12 h-12 rounded-md" />
                    <div className="flex flex-col w-10/12">
                      <p className="font-medium text-2xl overflow-hidden w-[99%] overflow-ellipsis">{e.ip}</p>
                      <div className="flex gap-1 mt-1">
                        {Array(e.rating).fill(0).map(() => <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />)}
                        {Array(5 - e.rating).fill(0).map(() => <div className="w-2.5 h-2.5 border-2 border-amber-400 rounded-full" />)}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 rounded-full ${e.status === 'Online' ? 'bg-amber-400' : 'bg-rose-500'} pr-4 pl-3 font-medium py-1 shadow-sm text-white`}>
                    <Icon icon={`uil:${e.status === 'Online' ? 'check' : 'times'}`} className="mt-0.5 w-5 h-5" />
                    {e.status}
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-8">
                  {[
                    [
                      ['wrench', e.version],
                      ['users-alt', e.playersOnline],
                    ],
                    [
                      ['tag-alt', e.gamemode],
                      ['processor', e.serverType],
                    ],
                  ].map((g) => (
                    <div className="flex px-2">
                      {g.map(([i, f]) => (
                        <div className="w-1/2 text-lg flex items-center gap-2">
                          <Icon icon={`uil:${i}`} className="text-amber-400 w-6 h-6" />
                          {f}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <img alt={e.ip} src={e.banner} className="w-full object-fill" />
            </Link>
          )) : ''}
        </div>
        {title.pagination.length ? (
          <div className="flex w-full items-center justify-center gap-12 mt-12">
            {currentPage - 1 >= 1 ? (
              <Link
                to={(() => {
                  const url = new URL(window.location.toString());
                  url.searchParams.set('page', currentPage - 1);
                  return url.pathname + url.search;
                })()}
                aria-label="hidden"
              >
                <Icon icon="uil:angle-double-left" className="w-8 h-8 text-amber-400" />
              </Link>
            ) : <Icon icon="uil:angle-double-left" className="w-8 h-8 text-slate-400" />}
            {title.pagination.slice(1, title.pagination.length - 1).map((e) => (
              <Link
                to={(() => {
                  const url = new URL(window.location.toString());
                  url.searchParams.set('page', e);
                  return url.pathname + url.search;
                })()}
                className={`${parseInt(e, 10) === currentPage ? 'bg-amber-400 text-white p-4 rounded-md shadow-md w-12 h-12 flex items-center justify-center' : 'text-slate-700 dark:text-white'} font-medium text-xl`}
              >
                {e}
              </Link>
            ))}
            {currentPage !== parseInt(title.pagination.slice(1, title.pagination.length - 1)[
              title.pagination.length - 3
            ], 10) ? (
              <Link
                to={(() => {
                  const url = new URL(window.location.toString());
                  url.searchParams.set('page', currentPage + 1);
                  return url.pathname + url.search;
                })()}
                aria-label="hidden"
              >
                <Icon icon="uil:angle-double-right" className="w-8 h-8 text-amber-400" />
              </Link>
              ) : <Icon icon="uil:angle-double-right" className="w-8 h-8 text-slate-400" />}
          </div>
        ) : ''}
      </div>
      <CountryChooser
        isCountryChooserOpen={isCountryChooserOpen}
        countries={countries}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
      />
    </>
  );
}

CatContent.propTypes = {
  data: PropTypes.objectOf.isRequired,
  title: PropTypes.objectOf.isRequired,
  currentPage: PropTypes.arrayOf(PropTypes.number).isRequired,
  countries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default CatContent;
