/* eslint-disable import/extensions */
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import 'flagpack/src/flagpack.scss';

import Loading from '../utils/Loading.jsx';

const getData = async (id) => {
  const cleanupData = (data) => {
    const d = Array.from(data).map((e) => Array.from(e.querySelectorAll('div')).map((f, i) => (i ? f : f.innerText.trim().replace(/\s/g, ''))).slice(0, 2)).map(([k, v]) => {
      let r;
      switch (k) {
        case 'ServerType':
        case 'Gamemodes':
        case 'Versions':
          r = Array.from(v.querySelectorAll('a')).map((e) => e.innerText.trim());
          break;
        case 'Connection':
          r = [v.innerText.trim(), v.querySelector('span').title.split(' ')[1]];
          break;
        case 'Country':
          r = [v.innerText.trim(), v.querySelector('img').src.split('/').pop().split('.')[0]];
          break;
        default:
          r = v.innerText.trim();
      }
      return [k[0].toLowerCase() + k.slice(1), r];
    });
    return Object.fromEntries(d);
  };

  const raw = await fetch(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/server/${id}`).then((res) => res.text());
  const HTMLParser = new DOMParser();
  const html = HTMLParser.parseFromString(raw, 'text/html');
  const data = {
    thumbnail: html.querySelector('section header img').src,
    name: html.querySelector('section header h1').innerText.trim(),
    .../^(?<status>Online|Offline)\s+-\s+(?<votes>\d+)\s+Vote\(s\),\s+(?<reviewCount>\d+)\s+Review\(s\),\s+Rated:\s+(?<rate>\d)\/5.$/.exec(html.querySelector('section header #vote-line').innerText.trim()).groups,
    website: Array.from(html.querySelectorAll('a.btn.btn-light.p-2.p-sm-3.py-3')).filter((e) => e.innerText.trim() === 'Website').shift()?.href || null,
    discord: Array.from(html.querySelectorAll('a.btn.btn-light.p-2.p-sm-3.py-3')).filter((e) => e.innerText.trim() === 'Discord').shift()?.href || null,
    ...cleanupData(html.querySelectorAll('#datadiv > div')),
  };
  return data;
};

function Details() {
  const params = useParams();
  const location = useLocation();

  const [data, setData] = React.useState({});

  React.useEffect(() => getData(parseInt(params.id, 10)).then((d) => setData(d)), [location]);

  return (
    JSON.stringify(data) !== '{}' ? (
      <div className="py-12 min-h-[52vh] px-16 font-[QuickSand] text-slate-700 dark:text-white transition-all duration-500 dark:text-white transition-all duration-500">
        <div className="flex items-center gap-4">
          <img src={data.thumbnail} alt="thumbnail" className="rounded-md w-20 h-20" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
              <h1 className="font-medium text-3xl tracking-wide text-slate-700 dark:text-white transition-all duration-500">{data.name}</h1>
              <div className={`flex mt-1 items-center gap-1 rounded-full ${data.status === 'Online' ? 'bg-amber-400' : 'bg-rose-500'} pr-4 pl-3 font-medium py-1 shadow-sm text-white`}>
                <Icon icon={`uil:${data.status === 'Online' ? 'check' : 'times'}`} className="mt-0.5 w-5 h-5" />
                {data.status}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array(parseInt(data.rate, 10)).fill(0).map(() => <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />)}
                {Array(5 - parseInt(data.rate, 10)).fill(0).map(() => <div className="w-2.5 h-2.5 border-2 border-amber-400 rounded-full" />)}
              </div>
              <p className="font-medium text-slate-700 dark:text-white transition-all duration-500">5 Vote(s), 21 Review(s)</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 my-12 text-slate-700 dark:text-white transition-all duration-500">
          <a href="/" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-amber-400 text-white">
            <Icon icon="uil:thumbs-up" className="w-6 h-6" />
            Votes
          </a>
          <a href="/" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-slate-100 dark:bg-zinc-600 dark:bg-zinc-600 transition-all duration-500">
            <Icon icon="uil:link" className="w-6 h-6" />
            Website
          </a>
          <a href="/" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-slate-100 dark:bg-zinc-600 dark:bg-zinc-600 transition-all duration-500">
            <Icon icon="mdi:discord" className="w-6 h-6" />
            Discord
          </a>
        </div>
        <h2 className="text-slate-400 text-2xl font-medium">Server Information</h2>
        <div className="mt-2 flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:location-point" className="w-6 h-6" />
            {data.javaIP ? 'Java' : 'Server'}
            {' '}
            IP
          </div>
          <div className="text-slate-700 dark:text-white transition-all duration-500 text-lg font-medium">{data.serverIP || data.javaIP}</div>
        </div>
        {data.bedrockIP ? (
          <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
            <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
              <Icon icon="uil:location-point" className="w-6 h-6" />
              Bedrock IP
            </div>
            <div className="text-slate-700 dark:text-white transition-all duration-500 text-lg font-medium">{data.bedrockIP}</div>
          </div>
        ) : ''}
        <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:server" className="w-6 h-6" />
            Server Type
          </div>
          <div className="text-slate-700 dark:text-white transition-all duration-500 font-medium flex flex-wrap gap-2">
            {data.serverType.map((e) => (
              <div className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-zinc-600 px-4 font-medium py-1 shadow-md text-slate-700 dark:text-white transition-all duration-500">
                {e}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:icons" className="w-6 h-6" />
            Gamemodes
          </div>
          <div className="text-slate-700 dark:text-white transition-all duration-500 font-medium flex flex-wrap gap-x-2 gap-y-2.5">
            {data.gamemodes.map((e) => (
              <div className="flex whitespace-nowrap items-center gap-1 rounded-full bg-slate-100 dark:bg-zinc-600 px-4 font-medium py-1 shadow-md text-slate-700 dark:text-white transition-all duration-500">
                {e}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:wrench" className="w-6 h-6" />
            Versions
          </div>
          <div className="text-slate-700 dark:text-white transition-all duration-500 font-medium flex flex-wrap gap-x-2 gap-y-2.5">
            {data.versions.map((e) => (
              <div className="flex whitespace-nowrap items-center gap-1 rounded-full bg-slate-100 dark:bg-zinc-600 px-4 font-medium py-1 shadow-md text-slate-700 dark:text-white transition-all duration-500">
                {e}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:users-alt" className="w-6 h-6" />
            Online Players
          </div>
          <div className="text-slate-700 dark:text-white transition-all duration-500 text-lg font-medium">{data.players}</div>
        </div>
        <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:tachometer-fast" className="w-6 h-6" />
            Connection
          </div>
          <div className="text-white font-medium">
            <div className="flex whitespace-nowrap items-center gap-1 rounded-full bg-emerald-400 px-4 font-medium py-1 shadow-md text-white">
              {data.connection[0]}
            </div>
          </div>
        </div>
        <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:globe" className="w-6 h-6" />
            Country
          </div>
          <div className="text-slate-700 dark:text-white transition-all duration-500 text-lg font-medium flex items-center gap-2">
            <span className={`fp fp-square fp-rounded fp-md ${data.country[1].toLowerCase()}`} />
            {data.country[0]}
          </div>
        </div>
        <div className="flex items-center py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:clock" className="w-6 h-6" />
            Uptime
          </div>
          <div className="text-slate-700 dark:text-white transition-all duration-500 text-lg font-medium">{data.uptime}</div>
        </div>
      </div>
    ) : <Loading />
  );
}

export default Details;
