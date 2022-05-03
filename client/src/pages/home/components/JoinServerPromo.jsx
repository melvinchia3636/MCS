import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

function JoinServerPromo() {
  return (
    <div className="w-full text-zinc-700 dark:text-white transition-all duration-500 flex-col my-12 flex justify-center items-center">
      <h2 className="text-4xl font-medium mb-2">Complete MC server list</h2>
      <p className="text-lg text-center">
        Our Minecraft server list is updated every 10 minutes to make
        sure servers are always online and ready to play on.
      </p>
      <div className="flex gap-4">
        <Link to="/java" className="bg-amber-400 flex items-center gap-2 text-white font-medium text-xl py-4 pl-6 pr-4 shadow-md mt-10 rounded-md">
          Java Servers
          <Icon icon="uil:arrow-right" className="w-8 h-8" />
        </Link>
        <Link to="/bedrock" className="bg-zinc-200 dark:bg-zinc-500 flex items-center gap-2 text-zinc-700 dark:text-white font-medium text-xl py-4 pl-6 pr-4 shadow-md mt-10 rounded-md">
          Bedrock Servers
          <Icon icon="uil:arrow-right" className="w-8 h-8" />
        </Link>
      </div>
    </div>
  );
}

export default JoinServerPromo;
