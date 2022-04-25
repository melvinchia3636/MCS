/* eslint-disable react/no-danger */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DetailsContext } from '..';

function ServerDescription() {
  const { data } = useContext(DetailsContext);

  return (
    <div className="flex justify-between mt-12 gap-12">
      <div>
        <h2 className="text-slate-400 text-2xl font-medium mb-4">Server Description</h2>
        <p dangerouslySetInnerHTML={{ __html: data.desc }} className="text-lg text-slate-700 dark:text-white transition-all duration-500" />
      </div>
      <div className="flex-shrink-0">
        <h2 className="text-slate-400 text-2xl font-medium mb-4">Similar Servers</h2>
        <div className="flex flex-col gap-4">
          {data.similar.map((e) => (
            <Link to={e.link} className="flex items-center gap-4 shadow-[0_4px_6px_rgba(0,0,0,.10)] rounded-xl p-6 bg-white dark:bg-zinc-600 hover:bg-slate-50 dark:hover:bg-zinc-500 transition-all duration-200">
              <img src={e.thumbnail} alt={e.thumbnail} />
              <div className="text-slate-700 dark:text-white transition-all duration-500">
                <h3 className="text-2xl font-medium">{e.name}</h3>
                <p className="text-lg whitespace-nowrap">
                  {e.info}
                  ,
                  {' '}
                  {e.onlinePlayers}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServerDescription;
