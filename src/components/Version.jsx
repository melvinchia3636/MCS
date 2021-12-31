/* eslint-disable import/extensions */
import React from 'react';
import {
  useSearchParams, useLocation, useParams, Link,
} from 'react-router-dom';
import { Icon } from '@iconify/react';

import Loading from './Loading.jsx';

function Version() {
  const searchParams = useSearchParams();
  const params = useParams();
  const location = useLocation();

  const [data, setData] = React.useState([]);
  const [title, setTitle] = React.useState({
    title: '',
    desc: '',
    pagination: [],
  });

  let currentPage = parseInt(searchParams[0].get('page'), 10) || 1;

  const fetchData = () => {
    setData([]);
    currentPage = parseInt(searchParams[0].get('page'), 10) || 1;
    window.scrollTo({ top: 0 });
    fetch(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/version/${params.version}/${currentPage}`).then((res) => res.text()).then((raw) => {
      const HTMLParser = new DOMParser();
      const html = HTMLParser.parseFromString(raw, 'text/html');
      const d = Array.from(html.querySelectorAll('.server-row')).map((e) => ({
        thumbnail: e.querySelector('img[src*=favicon]').src,
        banner: e.querySelector('img[src*=banner]').src,
        ip: e.querySelector('.ip-block').innerText,
        version: e.querySelector("span[title='Server Version']").innerText.trim(),
        gamemode: e.querySelector("span[title='Main Gamemode']").innerText.trim(),
        playersOnline: e.querySelector("span[title='Players Online']")?.innerText?.trim() || 'Not Available',
        serverType: e.querySelector("span[title='Server Type']").innerText.trim(),
        rating: e.querySelectorAll('.fa-star').length,
        status: e.querySelector('.badge.fs-6')?.innerText?.trim(),
      }));
      const t = {
        title: html.querySelector('h1').innerText.trim(),
        desc: html.querySelector('h1').nextElementSibling.innerText.trim(),
        pagination: Array.from(html.querySelectorAll('.pagination .page-link')).map((e) => e.innerText.trim()),
      };
      setTitle(t);
      setData(d);
    });
  };

  React.useEffect(fetchData, [location]);

  return (
    data.length ? (
      <div className="py-12 px-16 min-h-[52vh] font-[QuickSand] text-slate-700 dark:text-white transition-all duration-500 dark:bg-zinc-700">
        <h1 className="font-medium text-4xl mb-3 text-amber-400">{title.title}</h1>
        <p className="text-lg tracking-wide">{title.desc}</p>
        <div className="grid grid-cols-2 gap-6 mt-8">
          {data.length ? data.map((e) => (
            <div className="w-full overflow-hidden rounded-xl shadow-[0_6px_12px_rgba(0,0,0,.15)] bg-white dark:bg-zinc-600 transition-all duration-500">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img alt={e.ip} src={e.thumbnail} className="w-12 h-12" />
                    <div>
                      <p className="font-medium text-2xl">{e.ip}</p>
                      <div className="flex gap-1 mt-1">
                        {Array(e.rating).fill(0).map(() => <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />)}
                        {Array(5 - e.rating).fill(0).map(() => <div className="w-2.5 h-2.5 border-2 border-amber-400 rounded-full" />)}
                      </div>
                    </div>
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
              <img alt={e.ip} src={e.banner} className="w-full object-fill" />
            </div>
          )) : ''}
        </div>
        {title.pagination.length ? (
          <div className="flex w-full items-center justify-center gap-12 mt-12">
            <Link to={`?page=${currentPage - 1 >= 1 ? currentPage - 1 : 1}`} aria-label="hidden"><Icon icon="uil:angle-double-left" className="w-8 h-8 text-amber-400" /></Link>
            {title.pagination.slice(1, title.pagination.length - 1).map((e) => (
              <Link to={`?page=${e}`} className={`${parseInt(e, 10) === currentPage ? 'bg-amber-400 text-white p-4 rounded-md shadow-md w-12 h-12 flex items-center justify-center' : 'text-slate-700 dark:text-white'} font-medium text-xl`}>
                {e}
              </Link>
            ))}
            <Link to={`?page=${currentPage + 1}`} aria-label="hidden"><Icon icon="uil:angle-double-right" className="w-8 h-8 text-amber-400" /></Link>
          </div>
        ) : ''}
      </div>
    ) : <Loading />
  );
}

export default Version;
