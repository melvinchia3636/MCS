/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';

function QandA({ question, answer, showContent }) {
  const [isContentShow, toggleContent] = React.useState(showContent || false);
  return (
    <div className="text-zinc-700 dark:text-white bg-white dark:bg-zinc-600 transition-all duration-500 p-6 rounded-md shadow-[0_4px_6px_rgba(0,0,0,.10)]">
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

export default QandA;
