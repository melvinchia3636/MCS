/* eslint-disable import/extensions */
import React from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

import Loading from './utils/Loading.jsx';

function Section({ data, title, desc }) {
  return (
    <div className="py-12 font-[QuickSand] text-slate-700 dark:text-white transition-all duration-500">
      <h1 className="font-medium text-4xl mb-3">{title}</h1>
      <p className="text-lg tracking-wide">{desc}</p>
      <div className="grid grid-cols-2 gap-6 mt-8">
        {data.length ? data.map((e) => (
          <Link to={`/server/${e.id}`} className="w-full overflow-hidden rounded-xl shadow-[0_4px_6px_rgba(0,0,0,.10)] bg-white hover:duration-100 hover:bg-slate-50 dark:hover:bg-zinc-500 dark:bg-zinc-600 transition-all duration-500">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img alt={e.ip} src={e.thumbnail} className="w-12 h-12 rounded-md" />
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
          </Link>
        )) : ''}
      </div>
    </div>
  );
}

Section.propTypes = {
  data: PropTypes.arrayOf.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

function SmartSearchPromo() {
  return (
    <div className="w-full font-[QuickSand] text-slate-700 dark:text-white transition-all duration-500 rounded-xl shadow-md flex-col p-12 my-12 bg-slate-100 dark:bg-zinc-600 flex justify-center items-center">
      <h2 className="text-4xl font-medium mb-2">Search for a Server</h2>
      <p className="text-lg">
        Try out our brand new
        <b>Smart Search</b>
        {' '}
        and find the Minecraft Servers of your dreams
      </p>
      <button type="button" className="bg-amber-400 flex items-center gap-2 text-white font-medium text-xl py-4 pr-6 pl-5 shadow-md mt-6 rounded-md">
        <Icon icon="uil:search" className="w-6 h-6" />
        Smart Search
      </button>
    </div>
  );
}

function QandA({ question, answer, showContent }) {
  const [isContentShow, toggleContent] = React.useState(showContent || false);
  return (
    <div className="text-slate-700 dark:text-white bg-white dark:bg-zinc-600 transition-all duration-500 font-[QuickSand] p-6 rounded-md shadow-[0_4px_6px_rgba(0,0,0,.10)]">
      <div
        aria-hidden="true"
        onKeyDown={() => toggleContent(!isContentShow)}
        className={`w-full flex justify-between items-center cursor-pointer transition-all duration-500 ${isContentShow ? 'mb-3 text-amber-400' : ''}`}
        onClick={() => toggleContent(!isContentShow)}
      >
        <h3 className={`font-medium transition-all select-none duration-500 text-${isContentShow ? '2' : ''}xl`}>{question}</h3>
        <Icon icon={`uil:${isContentShow ? 'minus' : 'angle-down'}`} className="w-6 h-6" />
      </div>
      <div className={`text-lg overflow-hidden transition-all duration-500 ${isContentShow ? 'max-h-[32rem]' : 'max-h-0'}`}>
        {answer}
      </div>
    </div>
  );
}

QandA.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  showContent: PropTypes.bool.isRequired,
};

function FAQ() {
  return (
    <div className="text-slate-700 dark:text-white transition-all duration-500 faq font-[QuickSand] my-12">
      <h1 className="font-medium text-4xl mb-6">Frequently Asked Questions</h1>
      <div className="flex flex-col gap-3">
        <QandA
          showContent
          question="What are Minecraft Servers?"
          answer={(
            <>
              Minecraft servers are
              {' '}
              <b>multiplayer game server for Minecraft</b>
              . They are all owned and operated by people in the giant Minecraft community. They
              contain huge online worlds where thousands of Minecraft players can compete or
              collaborate with friends and frenemies in various games.
              <br />
              <br />
              Source:
              {' '}
              <a href="/">Wikipedia</a>
              ,&nbsp;
              <a href="/">Minecraft</a>
            </>
          )}
        />
        <QandA
          question="What is a Minecraft Server List?"
          answer={(
            <>
              A Minecraft Server List can refer to one of two things; Either a
              {' '}
              <b>website</b>
              {' '}
              where players can find high quality servers for Minecraft, or the
              <b> multiplayer</b>
              {' '}
              menu inside the Minecraft game client, where a list of known servers is saved for
              later use.
              <br />
              <br />
              Source:
              {' '}
              <a href="/">Fandom</a>
            </>
          )}
        />
        <QandA
          question="Does Minecraft have an official multiplayer server?"
          answer={(
            <>
              No, there is no such thing as an official Minecraft server. That being said,
              {' '}
              <a href="/">Mojang</a>
              {' '}
              (Minecraft&apos;s parent company) has officially
              partnered with a few servers like&nbsp;
              <a href="/">Mineplex</a>
              . Additionally, there are servers hosted by Mojang, called Minecraft Realms. Those,
              however, are limited in gameplay features;
              therefore, we wouldn&apos;t recommend them.&nbsp;
              <a href="/">Community-hosted</a>
              {' '}
              servers usually offer more options, better performance, and&nbsp;
              <a href="/">cost less</a>
              .
              <br />
              <br />
              Source:
              {' '}
              <a href="/">XBOX</a>
              ,&nbsp;
              <a href="/">Minecraft</a>
            </>
          )}
        />
        <QandA
          question="How can I find a Minecraft Server IP?"
          answer={(
            <>
              Any gamer can can use our
              {' '}
              <a href="/">Minecraft Server Search</a>
              {' '}
              feature to find a server IP for their specific device (whether that&apos;s a PC, a
              smartphone, or a console), or go through our server list.
            </>
          )}
        />
        <QandA
          question="What should I know before joining a server?"
          answer={(
            <>
              Every server has different rules you need to learn and respect, and a staff team to
              ensure you stick to them.
              <ol className="list-decimal pl-4 mt-4">
                <li>
                  Depending on the server, hacking is usually not allowed, nor is using a
                  cracked client.

                </li>
                <li>
                  Keep swear words under control. Be kind and considerate of others and don&apos;t
                  spam the in-game chat.

                </li>
                <li>
                  Respect the staff team and those offering their time to keep the server
                  running smoothly.

                </li>
                <li>
                  Running a server costs money. If you like it, consider donating to support it.
                </li>
              </ol>
            </>
          )}
        />
        <QandA
          question="What games can I play on MC servers?"
          answer={(
            <>
              Pretty much anything your heart desires. There&apos;s hundreds of servers each
              suiting a different gameplay style, catering to all tastes. A Creative server will
              turn you into an artist, allowing you to craft huge constructions with ease, whereas
              a survival vanilla server will have you hunt and mine day and night in order to
              survive the zombies and skeletons!
            </>
          )}
        />
        <QandA
          question="Where can I learn more about Minecraft?"
          answer={(
            <>
              You can visit the
              {' '}
              <a href="/">official Minecraft website</a>
              , or read through the&nbsp;
              <a href="/">Minecraft Wiki</a>
              . If you ever have any questions about Minecraft or Minecraft Servers, feel free to
              contact our support through the contact us button, or by joining our Discord server
              and creating a support ticket.
            </>
          )}
        />
        <QandA
          question="How can I play on a Minecraft server?"
          answer={(
            <>
              Find a server you like and copy it&apos;s IP address. Once you&apos;ve copied the
              IP, start Minecraft, click &quot;Multiplayer&quot;, then &quot;Add Server&quot;.
              Then, paste the server&apos;s address in the IP Address
              field. Click &quot;Done&quot; to confirm,
              you will then be taken back to the servers list. You can now click
              &quot;Join Server&quot; to play on it. Here&apos;s a
              {' '}
              <a href="/">complete video tutorial</a>
              . If you&apos;re facing any issues connecting, here are some&nbsp;
              <a href="/">troubleshooting tips</a>
              .
            </>
          )}
        />
      </div>
    </div>
  );
}

function JoinServerPromo() {
  return (
    <div className="w-full font-[QuickSand] text-slate-700 dark:text-white transition-all duration-500 rounded-xl shadow-md flex-col p-12 my-12 bg-slate-100 dark:bg-zinc-600 flex justify-center items-center">
      <h2 className="text-4xl font-medium mb-2">Complete MC server list</h2>
      <p className="text-lg text-center">
        <b>Not quite what you&apos;re looking for?</b>
        {' '}
        No worries, there are plenty more servers to choose from!
        <br />
        <br />
        There&apos;s a ton of MC servers listed on our site that you can join and play on. Game
        modes ranging from Survival, PvP, and Factions, to Creative, Skyblock, Pixelmon, and
        Minigames - We got it all! Just view the full list and use the filters at the top to
        select your preferred game mode and client version (1.8, 1.17, 1.18, or whichever you
        happen to use).
      </p>
      <Link to="/java" className="bg-amber-400 flex items-center gap-2 text-white font-medium text-xl py-4 pl-6 pr-4 shadow-md mt-10 rounded-md">
        All Java Servers
        <Icon icon="uil:arrow-right" className="w-8 h-8" />
      </Link>
    </div>
  );
}

function Home() {
  const [data, setData] = React.useState([]);
  const location = useLocation();

  const fetchData = () => {
    setData([]);
    fetch('https://cors-anywhere.thecodeblog.net/minecraft.buzz', { cache: 'no-store' }).then((res) => res.text()).then((raw) => {
      const HTMLParser = new DOMParser();
      const html = HTMLParser.parseFromString(raw, 'text/html');
      const d = Array.from(html.querySelectorAll('.row > section[itemtype*=Table]')).map((f) => Array.from(f.querySelectorAll('.server-row')).map((e) => ({
        id: e.querySelector('a').href.split('/').pop(),
        thumbnail: e.querySelector('img[src*=favicon]').src,
        banner: e.querySelector('img[src*=banner]').src,
        ip: e.querySelector('.ip-block').innerText,
        version: e.querySelector("span[title='Server Version']").innerText.trim(),
        gamemode: e.querySelector("span[title='Main Gamemode']").innerText.trim(),
        playersOnline: e.querySelector("span[title='Players Online']")?.innerText?.trim() || 'Not Available',
        serverType: e.querySelector("span[title='Server Type']").innerText.trim(),
        rating: e.querySelectorAll('.fa-star').length,
        status: e.querySelector('.badge.fs-6')?.innerText?.trim(),
      })));
      setData(d);
    });
  };

  React.useEffect(fetchData, [location]);

  return data.length ? (
    <div className="flex flex-col mx-16">
      <Section
        data={data[0]}
        title={(
          <>
            <span className="text-amber-400">The Best</span>
            {' '}
            Minecraft Servers
          </>
        )}
        desc={(
          <>
            Looking for the
            <b> best Minecraft servers</b>
            ? We have over 1050 of them! You can find all sorts of game modes and versions.
            Whether you&apos;re looking for a survival server, a creative server, or even one with
            PvP - we&apos;ve got it covered.
          </>
        )}
      />
      <Section
        data={data[1]}
        title={(
          <>
            <span className="text-amber-400">Most Popular</span>
            {' '}
            Minecraft Servers
          </>
        )}
        desc={(
          <>
            Play on the largest Minecraft communities along with tons of other competitors by
            joining any of the servers below! These have the
            <b> most server players online</b>
            {' '}
            right this moment, with content ranging from classic MMO RPG games to a parkour
            paradise. Enjoy the most massive worlds the best Minecraft multiplayer servers have to
            offer!
          </>
        )}
      />
      <Section
        data={data[2]}
        title={(
          <>
            <span className="text-amber-400">New</span>
            {' '}
            Multiplayer Servers in 2021
          </>
        )}
        desc={(
          <>
            Looking for the newest Minecraft Servers to play on? Game on the freshest servers
            added to our Minecraft server list in December 2021! This server table updates every
            few seconds. You can rest assured you won&apos;t find MC servers any fresher than this
            elsewhere! Join any of the
            {' '}
            <b>
              {data[2].length}
              {' '}
              latest servers below
            </b>
            , or browse more servers you can play on here.
          </>
        )}
      />
      <Section
        data={data[3]}
        title={(
          <>
            <span className="text-amber-400">1.18</span>
            {' '}
            Minecraft Servers
          </>
        )}
        desc={(
          <>
            So Microsoft and Mojang just released the latest Minecraft version... But your favorite
            Minecraft servers haven&apos;t quite caught up yet? You can still game with others -
            Experience the latest Minecraft updates online! Every game server below supports the
            <b> latest Minecraft 1.18</b>
            .
          </>
        )}
      />
      <SmartSearchPromo />
      <Section
        data={data[4]}
        title={(
          <>
            <span className="text-amber-400"> Survival</span>
            {' '}
            Servers on Minecraft
          </>
        )}
        desc={(
          <>
            Check out these excellent Minecraft Survival Servers, also known as
            <b> SMP Servers</b>
            ! These Minecraft servers are what an MC player would be most familiar with.
            They tend to be quite close to the original game&apos;s survival mode.
            You know, searching for Minecraft diamonds, crafting &quot;nether portals&quot;,
            avoiding Herobrine, that sort of stuff. Try this list if you&apos;re looking for a fun
            survival Minecraft server network! Also, don&apos;t forget to check out a cool
            variation of this game mode on (... but keep an eye out for mobs like Creepers and
            Griefers if you do, no Grief prevention plugins on those!)
          </>
        )}
      />
      <Section
        data={data[5]}
        title={(
          <>
            Best Minecraft
            <span className="text-amber-400"> Skyblock</span>
            {' '}
            Servers
          </>
        )}
        desc={(
          <>
            No server list for Minecraft would be complete without the inclusion of these servers!
            Upon joining a Skyblock mode server, players get assigned tiny custom islands to play
            on and eventually expand. In many ways, those servers are similar to survival servers,
            but are, for the most part,
            <b> much more challenging</b>
            .
          </>
        )}
      />
      <Section
        data={data[6]}
        title={(
          <>
            <span className="text-amber-400">Prison</span>
            {' '}
            Minecraft Servers
          </>
        )}
        desc={(
          <>
            When playing on servers of this game mode, the objective is to
            <b> earn in-game money as a rookie and advance your player rank over time</b>
            . Eventually, you&apos;ll gain the right to &quot;escape&quot; and be a free player.
            If you&apos;re not into PvP (or fast-paced / high-action) games & you&apos;re
            looking to play on a server for a decent amount of time, a prison server can
            be a superb choice.To play on Minecraft with servers that include a Prison map
            just pick one from the list below!
          </>
        )}
      />
      <JoinServerPromo />
      <FAQ />
    </div>
  ) : <Loading />;
}

export default Home;
export { QandA };
