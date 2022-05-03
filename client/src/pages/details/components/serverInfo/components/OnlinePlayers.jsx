import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { DetailsContext } from '../../..';

function OnlinePlayers() {
  const { data } = useContext(DetailsContext);

  return (
    <div className="flex items-center border-b border-zinc-200 dark:border-zinc-500 transition-all duration-500 py-4">
      <div className="flex items-center gap-2 text-lg w-72 font-medium text-zinc-500 dark:text-white transition-all duration-500 flex-shrink-0">
        <Icon icon="uil:users-alt" className="w-6 h-6" />
        Online Players
      </div>
      <div className="text-zinc-700 dark:text-white transition-all duration-500 text-lg font-medium">{data.players}</div>
    </div>
  );
}

export default OnlinePlayers;
