/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { DetailsContext } from '..';

export default function Buttons() {
  const { data } = useContext(DetailsContext);

  return (
    <div className="flex gap-2 my-12 text-zinc-700 dark:text-white transition-all duration-500">
      <a href="/" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-amber-400 hover:bg-amber-500 transition-all duration-200 text-white">
        <Icon icon="uil:thumbs-up" className="w-6 h-6" />
        Votes
      </a>
      {data.website ? (
        <a href={data.website} target="_blank" rel="noreferrer" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-zinc-100 hover:bg-zinc-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
          <Icon icon="uil:link" className="w-6 h-6" />
          Website
        </a>
      ) : ''}
      {data.discord ? (
        <a href={data.discord} target="_blank" rel="noreferrer" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-zinc-100 hover:bg-zinc-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
          <Icon icon="mdi:discord" className="w-6 h-6" />
          Discord
        </a>
      ) : ''}
    </div>
  );
}
