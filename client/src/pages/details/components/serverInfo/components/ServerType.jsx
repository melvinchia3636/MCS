/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DetailsContext } from '../../..';

function ServerType() {
  const { data } = useContext(DetailsContext);

  return (
    <div className="flex items-center border-b border-zinc-200 dark:border-zinc-500 transition-all duration-500 py-4">
      <div className="flex items-center gap-2 text-lg w-72 font-medium text-zinc-500 dark:text-white transition-all duration-500 flex-shrink-0">
        <Icon icon="uil:server" className="w-6 h-6" />
        Server Type
      </div>
      <div className="text-zinc-700 dark:text-white transition-all duration-500 font-medium flex flex-wrap gap-2">
        {data.serverType.map((e) => (
          <Link to={`/${e.split(' ')[0].toLowerCase()}`} className="flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-600 hover:bg-zinc-200 hover:duration-100 dark:hover:bg-zinc-500 px-4 font-medium py-1 shadow-md text-zinc-700 dark:text-white transition-all duration-500">
            {e}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ServerType;
