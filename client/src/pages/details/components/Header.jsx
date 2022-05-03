/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { DetailsContext } from '..';

export default function Header() {
  const { data } = useContext(DetailsContext);

  return (
    <div className="flex items-center gap-4">
      <img src={data.thumbnail} alt="thumbnail" className="rounded-md w-20 h-20" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-6">
          <h1 className="font-medium text-3xl tracking-wide text-zinc-700 dark:text-white transition-all duration-500">{data.name}</h1>
          <div className={`flex mt-1 items-center gap-1 rounded-full ${data.status === 'Online' ? 'bg-amber-400' : 'bg-rose-500'} pr-4 pl-3 font-medium py-1 shadow-md text-white`}>
            <Icon icon={`uil:${data.status === 'Online' ? 'check' : 'times'}`} className="mt-0.5 w-5 h-5" />
            {data.status}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {Array(parseInt(data.rate, 10) || 0).fill(0).map(() => <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />)}
            {Array(5 - (parseInt(data.rate, 10) || 0)).fill(0).map(() => <div className="w-2.5 h-2.5 border-2 border-amber-400 rounded-full" />)}
          </div>
          <p className="font-medium text-zinc-700 dark:text-white transition-all duration-500">
            {data.votes}
            {' '}
            Vote(s),
            {' '}
            {data.reviewCount}
            {' '}
            Review(s)
          </p>
        </div>
      </div>
    </div>
  );
}
