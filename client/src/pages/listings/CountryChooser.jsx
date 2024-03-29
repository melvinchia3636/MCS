import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { PropTypes } from 'prop-types';

function CountryChooser({
  isCountryChooserOpen, countries, setCountryFilter, countryFilter,
}) {
  return (
    <div className={`${isCountryChooserOpen ? 'z-[9999] bg-opacity-10' : 'z-[-1] bg-opacity-0'} fixed w-full h-screen top-0 left-0 flex items-center justify-center bg-black transition-all duration-500`}>
      <div className={`transform ${isCountryChooserOpen ? 'translate-y-0' : 'translate-y-[200%]'} bg-white dark:bg-zinc-600 w-[28rem] h-[calc(100vh-8rem)] shadow-lg py-6 px-8 text-zinc-700 dark:text-white rounded-xl transition-all duration-500 flex flex-col`}>
        <h1 className="font-medium text-2xl mb-4">Filter by Country</h1>
        <div className="flex items-center gap-2 border-b border-zinc-400 dark:border-zinc-500">
          <Icon icon="uil:search" className="text-zinc-400 dark:text-zinc-500 w-6 h-6" />
          <input onChange={(e) => setCountryFilter(e.target.value)} placeholder="Search country" type="text" className="text-lg py-1 focus:outline-none bg-white dark:bg-zinc-600 dark:placeholder-zinc-500" />
        </div>
        <div className="overflow-scroll">
          {countries
            .filter(
              ([e]) => !countryFilter || e.toLowerCase().includes(countryFilter.toLowerCase()),
            )
            .map((([e, f]) => (
              <Link
                to={(() => {
                  const url = new URL(window.location.href);
                  Array.from(url.searchParams.entries()).forEach(([k]) => (k === 'q' ? null : url.searchParams.delete(k)));
                  url.searchParams.append('country', f);
                  return url.pathname + url.search;
                })()}
                className="py-4 px-1 flex items-center gap-2 text-lg border-b text-zinc-700 border-zinc-200 dark:text-white dark:border-zinc-500"
              >
                <span className={`fp ${f?.toLowerCase()} fp-large !w-7 !h-7 flex-shrink-0 fp-square rounded-full`} />
                {e}
              </Link>
            )))}
        </div>
      </div>
    </div>
  );
}

CountryChooser.propTypes = {
  isCountryChooserOpen: PropTypes.bool.isRequired,
  countries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setCountryFilter: PropTypes.func.isRequired,
  countryFilter: PropTypes.string.isRequired,
};

export default CountryChooser;
