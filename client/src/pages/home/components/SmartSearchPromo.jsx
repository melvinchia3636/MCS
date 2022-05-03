import { Icon } from '@iconify/react';
import React from 'react';

function SmartSearchPromo() {
  return (
    <div className="w-full text-zinc-700 dark:text-white transition-all duration-500 flex-col my-12 flex justify-center items-center">
      <h2 className="text-4xl font-medium mb-2">Search for a Server</h2>
      <p className="text-lg">
        Try out our brand new
        {' '}
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

export default SmartSearchPromo;
