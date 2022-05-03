/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

function Section({ data, title, desc }) {
  return (
    <div className="py-12 text-zinc-700 dark:text-white transition-all duration-500">
      <h1 className="font-medium text-4xl mb-3">{title}</h1>
      <p className="text-lg tracking-wide">{desc}</p>
      <div className="grid grid-cols-2 gap-6 mt-8">
        {data?.length ? data.map((e) => (
          <Link to={`/server/${e.id}`} className="w-full overflow-hidden rounded-xl shadow-[0_4px_6px_rgba(0,0,0,.10)] bg-white hover:duration-100 hover:bg-zinc-50 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 w-9/12">
                  <img alt={e.ip} src={e.thumbnail} className="w-12 h-12 rounded-md" />
                  <p className="font-medium text-2xl truncate">
                    {e.ip}
                  </p>
                </div>
                <div className={`flex items-center gap-1 rounded-full ${e.status === 'Online' ? 'bg-amber-400' : 'bg-rose-500'} pr-4 pl-3 font-medium py-1 shadow-sm text-white`}>
                  <Icon icon={`uil:${e.status === 'Online' ? 'check' : 'times'}`} className="mt-0.5 w-5 h-5" />
                  {e.status}
                </div>
              </div>
              <div className="flex flex-col gap-6 mt-8">
                {[
                  [
                    ['wrench', e.version],
                    ['users-alt', e.playersOnline],
                  ],
                  [
                    ['tag-alt', e.gamemode],
                    ['processor', e.serverType],
                  ],
                ].map((g) => (
                  <div className="flex px-2">
                    {g.map(([i, f]) => (
                      <div className="w-1/2 text-lg flex items-center gap-2">
                        <Icon icon={`uil:${i}`} className="text-amber-400 w-6 h-6" />
                        {f}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {e.banner && <img alt={e.ip} src={e.banner} className="w-full object-fill" />}
            {e.video && (
              <video autoPlay loop muted>
                <source src={e.video} />
              </video>
            )}
          </Link>
        )) : ''}
      </div>
    </div>
  );
}

export default Section;
