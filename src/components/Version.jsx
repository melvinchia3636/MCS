import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

function Version() {
  const params = useParams();
  const [data, setData] = React.useState([]);
  const [title, setTitle] = React.useState({
    title: '',
    desc: '',
  });

  const fetchData = () => {
    fetch(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/version/${params.version}`).then((res) => res.text()).then((raw) => {
      const HTMLParser = new DOMParser();
      const html = HTMLParser.parseFromString(raw, 'text/html');
      const d = Array.from(html.querySelectorAll('.server-row')).map((e) => ({
        thumbnail: e.querySelector('img[src*=favicon]').src,
        banner: e.querySelector('img[src*=banner]').src,
        ip: e.querySelector('.ip-block').innerText,
        version: e.querySelector("span[title='Server Version']").innerText.trim(),
        gamemode: e.querySelector("span[title='Main Gamemode']").innerText.trim(),
        playersOnline: e.querySelector("span[title='Players Online']")?.innerText?.trim(),
        serverType: e.querySelector("span[title='Server Type']").innerText.trim(),
        rating: e.querySelectorAll('.fa-star').length,
        status: e.querySelector('.badge.fs-6')?.innerText?.trim(),
      }));
      const t = {
        title: html.querySelector('h1').innerText.trim(),
        desc: html.querySelector('h1').nextElementSibling.innerText.trim(),
      };
      setTitle(t);
      setData(d);
    });
  };

  React.useEffect(fetchData, []);

  return (
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
    </div>
  );
}

export default Version;
