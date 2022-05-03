import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { DetailsContext } from '../../..';

function Connection() {
  const { data } = useContext(DetailsContext);

  const [seePing, setSeePing] = React.useState(false);

  return (
    <div className="flex items-center border-b border-zinc-200 dark:border-zinc-500 transition-all duration-500 py-4">
      <div className="flex items-center gap-2 text-lg w-72 font-medium text-zinc-500 dark:text-white transition-all duration-500 flex-shrink-0">
        <Icon icon="uil:tachometer-fast" className="w-6 h-6" />
        Connection
      </div>
      <div className="text-white font-medium">
        <div className={`flex whitespace-nowrap items-center gap-1 rounded-full transition-all duration-500 cursor-help ${data.connection ? 'bg-emerald-400' : 'bg-rose-500'} px-4 font-medium py-1 shadow-md text-white`} onMouseEnter={() => setSeePing(true)} onMouseLeave={() => setSeePing(false)}>
          {data.connection ? data.connection[seePing ? 1 : 0] : 'Not available'}
        </div>
      </div>
    </div>
  );
}

export default Connection;
