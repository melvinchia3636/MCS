import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DetailsContext } from '../../..';

function Version() {
  const { data } = useContext(DetailsContext);

  return (
    <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
      <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
        <Icon icon="uil:wrench" className="w-6 h-6" />
        Versions
      </div>
      <div className="text-slate-700 dark:text-white transition-all duration-500 font-medium flex flex-wrap gap-x-2 gap-y-2.5">
        {data.versions.map((e) => (
          <Link to={`/version/${e}`} className="flex whitespace-nowrap items-center gap-1 rounded-full bg-slate-100 dark:bg-zinc-600 hover:bg-slate-200 hover:duration-100 dark:hover:bg-zinc-500 px-4 font-medium py-1 shadow-md text-slate-700 dark:text-white transition-all duration-500">
            {e}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Version;
