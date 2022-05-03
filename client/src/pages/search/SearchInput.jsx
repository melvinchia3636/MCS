import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
  const [mode, setMode] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();

  const gotoSearchResult = () => {
    const url = new URL(window.location.toString());
    url.searchParams.append('q', encodeURIComponent(query));
    navigate(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      gotoSearchResult();
    }
  };

  return (
    <div className="p-20 w-full">
      {mode === null ? (
        <>
          <h1 className="font-medium text-5xl text-amber-400 mb-3">Let&apos;s find you a server!</h1>
          <p className="text-xl tracking-wide mb-8 text-zinc-600 dark:text-white duration-500 transition-all">What would you like to do? :)</p>
          <div className="flex w-full items-center justify-center gap-4">
            <button onClick={() => setMode(0)} type="button" className="w-full h-16 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-600 shadow-md font-medium text-xl text-zinc-700 dark:text-white rounded-md transition-all duration-500">
              <Icon icon="uil:text-fields" width="28" height="28" />
              Word Search
            </button>
            <button onClick={() => setMode(1)} type="button" className="w-full h-16 bg-amber-400 flex items-center justify-center gap-2 font-medium text-xl text-white shadow-md rounded-md">
              <Icon icon="uil:lightbulb-alt" width="28" height="28" />
              Smart Search
            </button>
          </div>
        </>
      ) : ''}
      {[0, 1].includes(mode) ? (
        <div className="w-full text-zinc-700">
          <button onClick={() => setMode(null)} type="button" className="text-xl font-medium flex items-center justify-center gap-1">
            <Icon icon="uil:arrow-left" width="28" height="28" />
            Go Back
          </button>
        </div>
      ) : ''}
      {mode === 0 ? (
        <div className="h-full flex-grow w-full flex flex-col justify-center gap-4">
          <h1 className="font-medium text-5xl text-amber-400 mt-4">We&apos;re ready!</h1>
          <p className="text-xl tracking-wide mb-4 text-zinc-600 dark:text-white transition-all duration-500">
            Tell us what you&apos;re looking for and we&apos;ll find it ❤️
          </p>
          <div className="shadow-md p-6 rounded-md text-xl overflow-hidden flex items-center justify-center w-full gap-2 bg-white dark:bg-zinc-600 transition-all duration-500">
            <Icon icon="uil:search" width="28" height="28" className="text-zinc-400" />
            <input onChange={(e) => setQuery(e.target.value)} onEnter={gotoSearchResult} onKeyDown={handleKeyDown} type="text" placeholder="Type your keyword here..." className="w-full tracking-wide text-zinc-700 dark:text-white duration-500 transition-all focus:outline-none bg-transparent" />
          </div>
          <button onClick={gotoSearchResult} type="button" className="w-full h-16 bg-amber-400 flex items-center justify-center gap-1 font-medium text-2xl text-white shadow-md rounded-md">
            Go!
            <Icon icon="uil:arrow-right" width="32" height="32" />
          </button>
        </div>
      ) : ''}
    </div>
  );
}

export default SearchInput;
