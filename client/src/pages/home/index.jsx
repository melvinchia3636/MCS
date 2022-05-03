/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import { useLocation } from 'react-router-dom';
import getData from './lib/getData.js';

import Loading from '../../utils/components/Loading.jsx';

import Section from './components/Section.jsx';
import SmartSearchPromo from './components/SmartSearchPromo.jsx';
import FAQ from './components/FAQ.jsx';
import JoinServerPromo from './components/JoinServerPromo.jsx';

function Home() {
  const [data, setData] = React.useState([]);
  const location = useLocation();

  const fetchData = () => {
    setData([]);
    getData().then((d) => setData(d));
  };

  React.useEffect(fetchData, [location]);

  return data.length ? (
    <div className="flex flex-col mx-16 min-h-screen">
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
      <JoinServerPromo />
      <Section
        data={data[1]}
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
      <Section
        data={data[2]}
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
        data={data[3]}
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
      <SmartSearchPromo />
      <Section
        data={data[4]}
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
      <FAQ />
    </div>
  ) : <Loading />;
}

export default Home;
