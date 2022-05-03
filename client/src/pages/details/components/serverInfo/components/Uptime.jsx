import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { DetailsContext } from '../../..';

function Uptime() {
  const { data } = useContext(DetailsContext);

  return (
    <div className="flex items-center py-4">
      <div className="flex items-center gap-2 text-lg w-72 font-medium text-zinc-500 dark:text-white transition-all duration-500 flex-shrink-0">
        <Icon icon="uil:clock" className="w-6 h-6" />
        Uptime
      </div>
      <div className="text-zinc-700 dark:text-white transition-all duration-500 text-lg font-medium">{data.uptime}</div>
    </div>
  );
}

export default Uptime;
