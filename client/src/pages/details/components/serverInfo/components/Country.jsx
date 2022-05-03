import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { DetailsContext } from '../../..';

function Country() {
  const { data } = useContext(DetailsContext);

  return (
    <div className="flex items-center border-b border-zinc-200 dark:border-zinc-500 transition-all duration-500 py-4">
      <div className="flex items-center gap-2 text-lg w-72 font-medium text-zinc-500 dark:text-white transition-all duration-500 flex-shrink-0">
        <Icon icon="uil:globe" className="w-6 h-6" />
        Country
      </div>
      <div className="text-zinc-700 dark:text-white transition-all duration-500 text-lg font-medium flex items-center gap-2">
        <span className={`fp fp-square !w-8 !h-8 rounded-full ${data.country[1].toLowerCase()}`} />
        {data.country[0]}
      </div>
    </div>
  );
}

export default Country;
