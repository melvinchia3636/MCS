/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import 'flagpack/src/flagpack.scss';

import CountryChooser from './CountryChooser.jsx';

function CatContent({
  title, data, currentPage, countries, hasSorting,
}) {
  const [isCountryChooserOpen, toggleCountryChooser] = React.useState(false);
  const [isServerTypeChooserOpen, toggleServerTypeChooser] = React.useState(false);
  const [isSortingChooserOpen, toggleSortingChooser] = React.useState(false);
  const [countryFilter, setCountryFilter] = React.useState('');

  const currentCountry = new URL(window.location.toString()).searchParams.get('country');

  return (
    <>
      <div className="py-12 min-h-[52vh] px-16 text-zinc-700 dark:text-white transition-all duration-500">
        <h1 className="font-medium text-4xl mb-3 text-amber-400">{title.title}</h1>
        <p className="text-lg tracking-wide">{title.desc}</p>
        <div className="mt-4 flex gap-3">
          {hasSorting ? (
            <button type="button" className="flex-grow relative font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-zinc-100 hover:bg-zinc-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500" onClick={() => toggleSortingChooser(!isSortingChooserOpen)}>
              <Icon icon="uil:sort" className="w-6 h-6" />
              Sort by:
              {' '}
              {['Players', 'Votes', 'Latest'][new URL(window.location.href).searchParams.get('sort')] || 'None'}
              <div className={`w-full overflow-hidden bg-white text-zinc-700 dark:bg-zinc-600 dark:text-white absolute bottom-0 left-0 transform translate-y-full shadow-md rounded-lg px-6 transition-all flex flex-col duration-500 ${isSortingChooserOpen ? 'max-h-56 py-5' : 'max-h-0'}`}>
                <Link
                  to={(() => {
                    const url = new URL(window.location.toString());
                    url.searchParams.set('sort', 0);
                    url.searchParams.delete('page');
                    return url.pathname + url.search;
                  })()}
                  className="border-b border-zinc-100 pb-4 mb-4 flex items-center gap-2"
                >
                  <Icon
                    icon="uil:users-alt"
                    className="w-6 h-6"
                  />
                  Players
                </Link>
                <Link
                  to={(() => {
                    const url = new URL(window.location.toString());
                    url.searchParams.set('sort', 1);
                    url.searchParams.delete('page');
                    return url.pathname + url.search;
                  })()}
                  className="border-b border-zinc-100 pb-4 mb-4 flex items-center gap-2"
                >
                  <Icon icon="uil:thumbs-up" className="w-6 h-6" />
                  Votes
                </Link>
                <Link
                  to={(() => {
                    const url = new URL(window.location.toString());
                    url.searchParams.set('sort', 2);
                    url.searchParams.delete('page');
                    return url.pathname + url.search;
                  })()}
                  className="flex items-center gap-2"
                >
                  <Icon icon="uil:clock" className="w-6 h-6" />
                  Latest
                </Link>
              </div>
            </button>
          ) : ''}
          <button onClick={() => toggleCountryChooser(true)} type="button" href={data.website} target="_blank" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-zinc-100 hover:bg-zinc-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
            <Icon icon="uil:globe" className="w-6 h-6" />
            Country:
            {' '}
            {currentCountry ? <span className={`fp fp-square fp-large !w-6 !h-6 rounded-full ${currentCountry.toLowerCase()}`} /> : ''}
            {(countries.filter((e) => e[1] === currentCountry)[0] || [])[0] || 'All'}
          </button>
          <button type="button" className="flex-grow font-medium py-4 text-lg flex relative justify-center items-center gap-2 rounded-md shadow-md bg-zinc-100 hover:bg-zinc-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500" onClick={() => toggleServerTypeChooser(!isServerTypeChooserOpen)}>
            <Icon icon="uil:server" className="w-6 h-6" />
            Server Type:
            {' '}
            {['Java', 'Bedrock / PE'][parseInt(new URL(window.location.toString()).searchParams.get('type'), 10)] || 'All'}
            <div className={`w-full overflow-hidden bg-white text-zinc-700 dark:bg-zinc-600 dark:text-white absolute bottom-0 left-0 transform translate-y-full shadow-md rounded-lg px-6 transition-all flex flex-col duration-500 ${isServerTypeChooserOpen ? 'max-h-32 py-5' : 'max-h-0'}`}>
              <Link
                to={(() => {
                  const url = new URL(window.location.toString());
                  url.searchParams.set('type', 0);
                  url.searchParams.delete('page');
                  return url.pathname + url.search;
                })()}
                className="border-b border-zinc-100 pb-4 mb-4 flex items-center gap-2"
              >
                <Icon
                  icon="grommet-icons:java"
                  className="w-6 h-6"
                />
                Minecraft Java Edition
              </Link>
              <Link
                to={(() => {
                  const url = new URL(window.location.toString());
                  url.searchParams.set('type', 1);
                  url.searchParams.delete('page');
                  return url.pathname + url.search;
                })()}
                className="flex items-center gap-2"
              >
                <Icon icon="uil:desktop" className="w-6 h-6" />
                Minecraft Bedrock/PE Edition
              </Link>
            </div>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-8">
          {data.length ? data.map((e) => (
            <Link
              to={`/server/${e.id}`}
              className="block w-full overflow-hidden rounded-xl
             bg-white hover:duration-100 hover:bg-zinc-50 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 w-8/12">
                    <img alt={e.ip} src={e.thumbnail} className="w-12 h-12 rounded-md" />
                    <div className="flex flex-col w-full">
                      <p className="font-medium text-2xl w-[99%] truncate">
                        {e.ip}
                      </p>
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
              {e.banner && <img alt={e.ip} src={e.banner} className="w-full object-fill" />}
              {e.video && (
              <video autoPlay loop muted>
                <source src={e.video} />
              </video>
              )}
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
            ) : <Icon icon="uil:angle-double-left" className="w-8 h-8 text-zinc-400" />}
            {title.pagination.slice(1, title.pagination.length - 1).map((e) => (
              <Link
                to={(() => {
                  const url = new URL(window.location.toString());
                  url.searchParams.set('page', e);
                  return url.pathname + url.search;
                })()}
                className={`${parseInt(e, 10) === currentPage ? 'bg-amber-400 text-white p-4 rounded-md shadow-md w-12 h-12 flex items-center justify-center' : 'text-zinc-700 dark:text-white'} font-medium text-xl`}
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
              ) : <Icon icon="uil:angle-double-right" className="w-8 h-8 text-zinc-400" />}
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

export default CatContent;
