/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React from 'react';

import BedrockIP from './components/BedrockIP';
import Connection from './components/Connection';
import Country from './components/Country';
import Gamemodes from './components/Gamemodes';
import OnlinePlayers from './components/OnlinePlayers';
import ServerIP from './components/ServerIP';
import ServerType from './components/ServerType';
import Uptime from './components/Uptime';
import Version from './components/Version';

export default function ServerInfo() {
  return (
    <>
      <h2 className="text-zinc-400 text-2xl font-medium">Server Information</h2>
      <ServerIP />
      <BedrockIP />
      <ServerType />
      <Gamemodes />
      <Version />
      <OnlinePlayers />
      <Connection />
      <Country />
      <Uptime />
    </>
  );
}
