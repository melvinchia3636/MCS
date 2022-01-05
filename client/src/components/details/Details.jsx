/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable import/extensions */
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Lottie from 'react-lottie';
import loadingAnim from '../utils/loading-white.json';
import 'flagpack/src/flagpack.scss';

import Loading from '../utils/Loading.jsx';
import { QandA } from '../Home.jsx';

const getReview = async (id, limit) => {
  const reviewRaw = await fetch(`http://localhost:3000/review/${id}/${limit}`).then((res) => res.text());
  const HTMLParser = new DOMParser();
  const html = HTMLParser.parseFromString(reviewRaw, 'text/html');
  const data = Array.from(html.querySelectorAll('div[id*=review]')).map((e) => ({
    avatar: e.querySelector('img').src,
    name: e.querySelector('strong').textContent,
    date: Array.from(e.querySelectorAll('i')).pop().textContent,
    rating: e.querySelectorAll('.fa-star').length,
    content: e.querySelector('span').textContent,
  }));

  const nextLimitRaw = html.querySelector('#showMore');
  const nextLimit = nextLimitRaw ? nextLimitRaw.attributes.onclick.value.split(',').shift().split('(').pop() : null;

  return [data, parseInt(nextLimit, 10)];
};

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

  const raw = await fetch(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/server/${id}`, { cache: 'no-store' }).then((res) => res.text());
  const HTMLParser = new DOMParser();
  const html = HTMLParser.parseFromString(raw, 'text/html');
  const data = {
    thumbnail: html.querySelector('section header img').src,
    name: html.querySelector('section header h1').innerText.trim(),
    .../^(?<status>Online|Offline)\s+(-|\|)\s+(?<votes>\d+)\s+Vote\(s\),\s+(?<reviewCount>(?:\d+|No))\s+Review(?:s|\(s\))(?:,\s+Rated:\s+(?<rate>\d)\/5)?./.exec(html.querySelector('section header #vote-line').innerText.trim()).groups,
    website: Array.from(html.querySelectorAll('a.btn.btn-light.p-2.p-sm-3.py-3')).filter((e) => e.innerText.trim() === 'Website').shift()?.href || null,
    discord: Array.from(html.querySelectorAll('a.btn.btn-light.p-2.p-sm-3.py-3')).filter((e) => e.innerText.trim() === 'Discord').shift()?.href || null,
    ...cleanupData(html.querySelectorAll('#datadiv > div')),
    desc: html.querySelectorAll('section')[1].querySelector('p').innerHTML.trim(),
    similar: Array.from(html.querySelectorAll('.server-listing')).map((e) => ({
      name: e.querySelector('h3').innerText.trim(),
      thumbnail: e.querySelector('img').src,
      info: e.querySelector('.flex-grow-1.ms-3 > i').innerText.trim().replace(',', ''),
      rates: e.querySelector('strong').innerText.trim().split(' ').pop().split('/')
        .shift(),
      onlinePlayers: e.querySelector('.flex-grow-1.ms-3').innerHTML.split('<br>')[1].replace(',', ''),
      link: `/server/${e.querySelector('a').href.split('/').pop()}`,
    })),
  };
  return data;
};

function Details() {
  const params = useParams();
  const location = useLocation();

  const [data, setData] = React.useState({});
  const [review, setReview] = React.useState([]);
  const [nextLimit, setNextLimit] = React.useState(0);
  const [seePing, setSeePing] = React.useState(false);
  const [isLoadingReview, setIsLoadingReview] = React.useState(false);

  React.useEffect(() => {
    setData({});
    getData(parseInt(params.id, 10)).then((d) => setData(d));
    getReview(parseInt(params.id, 10), nextLimit).then(([newReview, newLimit]) => {
      setReview(review.concat(newReview));
      setNextLimit(newLimit);
    });
  }, [location]);

  const showMore = () => {
    setIsLoadingReview(true);
    getReview(parseInt(params.id, 10), nextLimit).then(([newReview, newLimit]) => {
      setReview(review.concat(newReview));
      setNextLimit(newLimit);
      setIsLoadingReview(false);
    });
  };

  return (
    JSON.stringify(data) !== '{}' ? (
      <div className="py-12 min-h-[52vh] px-16 font-[QuickSand] text-slate-700 dark:text-white transition-all duration-500">
        <div className="flex items-center gap-4">
          <img src={data.thumbnail} alt="thumbnail" className="rounded-md w-20 h-20" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
              <h1 className="font-medium text-3xl tracking-wide text-slate-700 dark:text-white transition-all duration-500">{data.name}</h1>
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
              <p className="font-medium text-slate-700 dark:text-white transition-all duration-500">
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
        <div className="flex gap-2 my-12 text-slate-700 dark:text-white transition-all duration-500">
          <a href="/" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-amber-400 hover:bg-amber-500 transition-all duration-200 text-white">
            <Icon icon="uil:thumbs-up" className="w-6 h-6" />
            Votes
          </a>
          {data.website ? (
            <a href={data.website} target="_blank" rel="noreferrer" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-slate-100 hover:bg-slate-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
              <Icon icon="uil:link" className="w-6 h-6" />
              Website
            </a>
          ) : ''}
          {data.discord ? (
            <a href={data.discord} target="_blank" rel="noreferrer" className="flex-grow font-medium py-4 text-lg flex justify-center items-center gap-2 rounded-md shadow-md bg-slate-100 hover:bg-slate-200 hover:duration-200 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
              <Icon icon="mdi:discord" className="w-6 h-6" />
              Discord
            </a>
          ) : ''}
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
          <>
            <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
              <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
                <Icon icon="uil:location-point" className="w-6 h-6" />
                Bedrock IP
              </div>
              <div className="text-slate-700 dark:text-white transition-all duration-500 text-lg font-medium">{data.bedrockIP}</div>
            </div>
            <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
              <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
                <Icon icon="majesticons:hashtag-line" className="w-6 h-6" />
                Bedrock Port
              </div>
              <div className="text-slate-700 dark:text-white transition-all duration-500 text-lg font-medium">{data.bedrockPort}</div>
            </div>
          </>
        ) : ''}
        <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:server" className="w-6 h-6" />
            Server Type
          </div>
          <div className="text-slate-700 dark:text-white transition-all duration-500 font-medium flex flex-wrap gap-2">
            {data.serverType.map((e) => (
              <Link to={`/${e.split(' ')[0].toLowerCase()}`} className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-zinc-600 hover:bg-slate-200 hover:duration-100 dark:hover:bg-zinc-500 px-4 font-medium py-1 shadow-md text-slate-700 dark:text-white transition-all duration-500">
                {e}
              </Link>
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
              <Link to={`/category/${e.toLowerCase().replace(/\s/g, '-')}`} className="flex whitespace-nowrap items-center gap-1 rounded-full bg-slate-100 dark:bg-zinc-600 hover:bg-slate-200 hover:duration-100 dark:hover:bg-zinc-500 px-4 font-medium py-1 shadow-md text-slate-700 dark:text-white transition-all duration-500">
                {e}
              </Link>
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
              <Link to={`/version/${e}`} className="flex whitespace-nowrap items-center gap-1 rounded-full bg-slate-100 dark:bg-zinc-600 hover:bg-slate-200 hover:duration-100 dark:hover:bg-zinc-500 px-4 font-medium py-1 shadow-md text-slate-700 dark:text-white transition-all duration-500">
                {e}
              </Link>
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
            <div className={`flex whitespace-nowrap items-center gap-1 rounded-full transition-all duration-500 cursor-help ${data.connection ? 'bg-emerald-400' : 'bg-rose-500'} px-4 font-medium py-1 shadow-md text-white`} onMouseEnter={() => setSeePing(true)} onMouseLeave={() => setSeePing(false)}>
              {data.connection ? data.connection[seePing ? 1 : 0] : 'Not available'}
            </div>
          </div>
        </div>
        <div className="flex items-center border-b border-slate-200 dark:border-zinc-500 transition-all duration-500 py-4">
          <div className="flex items-center gap-2 text-lg w-72 font-medium text-slate-500 dark:text-white transition-all duration-500 flex-shrink-0">
            <Icon icon="uil:globe" className="w-6 h-6" />
            Country
          </div>
          <div className="text-slate-700 dark:text-white transition-all duration-500 text-lg font-medium flex items-center gap-2">
            <span className={`fp fp-square !w-8 !h-8 rounded-full ${data.country[1].toLowerCase()}`} />
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
        <h2 className="text-slate-400 text-2xl font-medium mb-4 mt-12">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          <QandA
            question={`How do I join ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}?`}
            answer={(
              <>
                {data.javaIP || data.serverIP ? (
                  <>
                    Play McYAY with Minecraft Java:
                    <ul className="list-disc pl-8">
                      <li>
                        <span className="underline text-amber-400">Copy the Java server IP</span>
                        {' '}
                        from this page.
                      </li>
                      <li>Open up Minecraft and wait for it to fully load.</li>
                      <li>Click on &quot;Multiplayer&quot;, then &quot;Add Server&quot;.</li>
                      <li>Paste the Server&apos;s IP in the &quot;IP Address&quot; field.</li>
                      <li>Click &quot;Done&quot;.</li>
                      <li>
                        Select
                        {' '}
                        <b>{data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}</b>
                        {' '}
                        from the list and click on &quot;Join Server&quot;.
                      </li>
                    </ul>
                  </>
                ) : ''}
                {data.bedrockIP ? (
                  <>
                    <br />
                    Play McYAY with Minecraft Bedrock/PE:
                    <ul className="list-disc pl-8">
                      <li>Play BumbleCraft with Minecraft Bedrock / PE:</li>
                      <li>
                        <span className="underline text-amber-400">Copy the Bedrock server IP</span>
                        {' '}
                        from this page.
                      </li>
                      <li>
                        Open up Minecraft Pocket Edition and press
                        the &quot;Play&quot; button.
                      </li>
                      <li>
                        Go to the &quot;Servers&quot; tab and
                        press the &quot;Add Server&quot; button.
                      </li>
                      <li>
                        Paste the Server&apos;s IP in the &quot;Server
                        Address&quot; field,&nbsp;
                      </li>
                      <li>
                        and
                        {' '}
                        <b>{data.bedrockPort}</b>
                        {' '}
                        in the &quot;Port&quot; field.
                      </li>
                      <li>Click &quot;Play&quot; to quickly join the server.</li>
                    </ul>
                  </>
                ) : ''}
                <br />
                If you&apos;re having issues connecting,&nbsp;
                check out our connection troubleshooting guide.
              </>
          )}
          />
          <QandA
            question={`What is the server IP for ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}?`}
            answer={(
              <>
                {data.javaIP || data.serverIP ? (
                  <>
                    BumbleCraft&apos;s Java Edition IP Address is
                    {' '}
                    <b>{data.javaIP || data.bedrockIP}</b>
                    .
                  </>
                ) : ''}
                {data.bedrockIP ? (
                  <>
                    <br />
                    The Bedrock IP Address is
                    {' '}
                    <b>{data.bedrockIP}</b>
                    {' '}
                    and the port is
                    {' '}
                    <b>{data.bedrockPort}</b>
                    .
                  </>
                ) : ''}
              </>
          )}
          />
          <QandA
            question={`Does ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))} have a PE server?`}
            answer={data.bedrockIP ? (
              <>
                <b>Yes</b>
                , BumbleCraft is a Bedrock-compatible server!
                You can join it using a PS4, Xbox, Android, iOS (iPod Touch, iPhone, iPad),Windows
                10 PC, or any other device supporting Minecraft Bedrock / Pocket Edition (MCPE).
              </>
            ) : (
              <>
                No. You can only join McYAY using Minecraft Java Edition.
              </>
            )}
          />
          <QandA
            question={`Is ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))} free to play?`}
            answer={(
              <>
                Yes - As are all
                {' '}
                <Link to="/" className="underline text-amber-400">Minecraft servers</Link>
                {' '}
                listed on MCS.
              </>
            )}
          />
          <QandA
            question="I have an issue. Who can I contact?"
            answer={(
                data.discord ? (
                  <>
                    You can join the
                    {' '}
                    <a className="text-amber-400 underline" target="_blank" rel="noreferrer" href={data.discord}>
                      {data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}
                      {' '}
                      Discord server
                    </a>
                    {' '}
                    and direct your questions there. There should be instructions on how to get
                    support - If not, contact a staff member.
                  </>
                ) : (data.website ? (
                  <>
                    You can look on
                    {' '}
                    <a className="text-amber-400 underline" target="_blank" rel="noreferrer" href={data.website}>
                      {data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}
                      &apos;s website
                    </a>
                    {' '}
                    to find the owner&apos;s or staff team&apos;s contact information.
                  </>
                ) : (
                  <>
                    The server owner hasn&apos;t provided any contact information.
                  </>
                ))
            )}
          />
          <QandA
            question="I have an issue. Who can I contact?"
            answer={`Right now, there are ${parseInt(data.players?.split('/')?.shift()?.trim(), 10) || 'no'} people playing on ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server')).trim()}. Up to ${data.players?.split('/')?.pop()?.trim()} can join.`}
          />
        </div>
        <h2 className="text-slate-400 text-2xl font-medium mt-12">Server Reviews</h2>
        <div className="flex flex-col gap-4 mt-4">
          {review.length ? review.map((e) => (
            <div className="text-slate-700 bg-white p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,.10)]">
              <div className="flex gap-4 items-center">
                <img src={e.avatar} className="rounded-md" alt={e.name} />
                <div>
                  <h4 className="font-medium text-2xl">{e.name}</h4>
                  <div className="flex gap-1 mt-1">
                    {Array(parseInt(e.rating, 10) || 0).fill(0).map(() => <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />)}
                    {Array(5 - (parseInt(e.rating, 10) || 0)).fill(0).map(() => <div className="w-2.5 h-2.5 border-2 border-amber-400 rounded-full" />)}
                  </div>
                  <p className="text-slate-400 font-medium mt-1">{e.date}</p>
                </div>
              </div>
              <p className="mt-4 text-lg">{e.content}</p>
            </div>
          )) : <p className="text-lg">No reviews were found.</p>}
        </div>
        {nextLimit ? (
          <button type="button" onClick={showMore} className="w-full h-16 text-white font-medium text-xl bg-amber-400 rounded-lg mt-4 shadow-md">
            {
          isLoadingReview ? (
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: loadingAnim,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={40}
              width={40}
              isStopped={false}
              isPaused={false}
            />
          ) : 'Show more reviews'
        }
          </button>
        ) : ''}
      </div>
    ) : <Loading />
  );
}

export default Details;
