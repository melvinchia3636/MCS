import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

function Navbar({ setTheme, theme }) {
  const [isDropdownShow, toggleDropdown] = React.useState(false);

  return (
    <>
      <nav className="relative z-10 w-full py-6 px-16 bg-slate-100 flex justify-between items-center transition-all duration-500 dark:bg-zinc-600 shadow-md">
        <a href="/">
          <svg width="100" height="37" viewBox="0 0 117 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8378 14.3047C10.9642 13.9716 11.2178 13.7025 11.5427 13.5563C11.8676 13.4102 12.2372 13.399 12.5703 13.5253L21.5 16.9115L30.4296 13.5253C30.5956 13.4576 30.7735 13.4237 30.9527 13.4258C31.1319 13.4279 31.309 13.4658 31.4733 13.5373C31.6377 13.6088 31.7861 13.7125 31.9098 13.8422C32.0335 13.972 32.13 14.1251 32.1936 14.2927C32.2572 14.4603 32.2866 14.639 32.2801 14.8181C32.2736 14.9972 32.2314 15.1733 32.1558 15.3358C32.0802 15.4984 31.9729 15.6442 31.8402 15.7646C31.7074 15.8851 31.5519 15.9778 31.3828 16.0372L22.8437 19.2783V29.1164C22.8437 29.4728 22.7021 29.8145 22.4501 30.0665C22.1981 30.3185 21.8563 30.4601 21.5 30.4601C21.1436 30.4601 20.8018 30.3185 20.5498 30.0665C20.2978 29.8145 20.1562 29.4728 20.1562 29.1164V19.2801L11.6171 16.0354C11.2841 15.9089 11.0149 15.6554 10.8688 15.3305C10.7226 15.0056 10.7115 14.636 10.8378 14.3029V14.3047Z" className="fill-amber-400" />
            <path d="M18.9755 4.50066C20.5945 3.84426 22.4055 3.84426 24.0244 4.50066L37.4584 9.94733C38.037 10.1817 38.5325 10.5835 38.8814 11.1012C39.2303 11.619 39.4167 12.2291 39.4166 12.8534V30.1466C39.4167 30.7709 39.2303 31.381 38.8814 31.8987C38.5325 32.4165 38.037 32.8183 37.4584 33.0527L24.0244 38.4993C22.4055 39.1557 20.5945 39.1557 18.9755 38.4993L5.5416 33.0527C4.96295 32.8183 4.46745 32.4165 4.11857 31.8987C3.76969 31.381 3.58331 30.7709 3.58331 30.1466V12.8552C3.58331 12.2309 3.76969 11.6208 4.11857 11.103C4.46745 10.5853 4.96295 10.1835 5.5416 9.94912L18.9755 4.50245V4.50066ZM23.0139 6.99108C22.043 6.59762 20.957 6.59762 19.986 6.99108L6.55031 12.4377C6.46762 12.4713 6.39683 12.5288 6.34703 12.6029C6.29723 12.6769 6.27069 12.7642 6.27081 12.8534V30.1466C6.27069 30.2358 6.29723 30.3231 6.34703 30.3971C6.39683 30.4712 6.46762 30.5287 6.55031 30.5622L19.986 36.0089C20.957 36.4024 22.043 36.4024 23.0139 36.0089L36.4496 30.5622C36.5323 30.5287 36.6031 30.4712 36.6529 30.3971C36.7027 30.3231 36.7293 30.2358 36.7291 30.1466V12.8552C36.7293 12.766 36.7027 12.6787 36.6529 12.6046C36.6031 12.5306 36.5323 12.4731 36.4496 12.4395L23.0139 6.99287V6.99108Z" className="fill-amber-400" />
            <path d="M73.348 12.372C73.7213 12.3907 74.0387 12.5307 74.3 12.792C74.5613 13.0347 74.692 13.3427 74.692 13.716V30.656C74.692 31.0293 74.5613 31.3467 74.3 31.608C74.0573 31.8693 73.7307 32 73.32 32C72.9093 32 72.5733 31.8787 72.312 31.636C72.0507 31.3747 71.92 31.048 71.92 30.656V17.692L66.488 25.924C66.3573 26.092 66.1893 26.232 65.984 26.344C65.7973 26.456 65.6013 26.5027 65.396 26.484C65.2093 26.5027 65.0133 26.456 64.808 26.344C64.6213 26.232 64.4627 26.092 64.332 25.924L58.872 17.44V30.656C58.872 31.048 58.7507 31.3747 58.508 31.636C58.284 31.8787 57.976 32 57.584 32C57.2107 32 56.9027 31.8787 56.66 31.636C56.436 31.3747 56.324 31.048 56.324 30.656V13.716C56.324 13.3613 56.4547 13.0533 56.716 12.792C56.9773 12.512 57.304 12.372 57.696 12.372C57.92 12.372 58.1347 12.428 58.34 12.54C58.564 12.652 58.7413 12.8013 58.872 12.988L65.508 23.04L72.228 12.988C72.5267 12.5773 72.9 12.372 73.348 12.372ZM96.1194 13.548C96.5674 13.7907 96.7914 14.164 96.7914 14.668C96.7914 15.004 96.6794 15.312 96.4554 15.592C96.2314 15.8907 95.9234 16.04 95.5314 16.04C95.2701 16.04 95.0181 15.9747 94.7754 15.844C93.6181 15.1907 92.3674 14.864 91.0234 14.864C89.6234 14.864 88.3821 15.172 87.2994 15.788C86.2354 16.404 85.4048 17.272 84.8074 18.392C84.2101 19.4933 83.9114 20.7627 83.9114 22.2C83.9114 23.7493 84.2194 25.084 84.8354 26.204C85.4514 27.324 86.3008 28.1827 87.3834 28.78C88.4661 29.3587 89.6794 29.648 91.0234 29.648C92.4048 29.648 93.6554 29.312 94.7754 28.64C94.9994 28.528 95.2421 28.472 95.5034 28.472C95.9141 28.472 96.2408 28.6307 96.4834 28.948C96.7074 29.228 96.8194 29.5267 96.8194 29.844C96.8194 30.068 96.7541 30.2827 96.6234 30.488C96.5114 30.6747 96.3528 30.824 96.1474 30.936C95.4194 31.3467 94.5981 31.6733 93.6834 31.916C92.7874 32.1587 91.9008 32.28 91.0234 32.28C89.2128 32.28 87.5421 31.8787 86.0114 31.076C84.4994 30.2733 83.2861 29.1067 82.3714 27.576C81.4754 26.0453 81.0274 24.2533 81.0274 22.2C81.0274 20.3147 81.4568 18.616 82.3154 17.104C83.1928 15.5733 84.3874 14.3787 85.8994 13.52C87.4301 12.6427 89.1381 12.204 91.0234 12.204C92.8341 12.204 94.5328 12.652 96.1194 13.548ZM108.739 32.28C107.376 32.28 106.172 32.0933 105.127 31.72C104.082 31.328 103.083 30.7027 102.131 29.844C101.739 29.508 101.543 29.1253 101.543 28.696C101.543 28.36 101.674 28.0613 101.935 27.8C102.196 27.52 102.504 27.38 102.859 27.38C103.176 27.38 103.447 27.4827 103.671 27.688C104.418 28.3787 105.183 28.892 105.967 29.228C106.77 29.5453 107.675 29.704 108.683 29.704C109.859 29.704 110.848 29.4333 111.651 28.892C112.472 28.3507 112.883 27.6693 112.883 26.848C112.864 25.8773 112.454 25.1307 111.651 24.608C110.867 24.0667 109.663 23.6187 108.039 23.264C106.116 22.872 104.632 22.228 103.587 21.332C102.56 20.436 102.047 19.1947 102.047 17.608C102.047 16.5067 102.336 15.5453 102.915 14.724C103.494 13.884 104.296 13.24 105.323 12.792C106.35 12.344 107.507 12.12 108.795 12.12C109.952 12.12 111.044 12.3067 112.071 12.68C113.098 13.0533 113.928 13.548 114.563 14.164C114.992 14.5373 115.207 14.9387 115.207 15.368C115.207 15.704 115.076 16.0027 114.815 16.264C114.572 16.5253 114.274 16.656 113.919 16.656C113.658 16.656 113.443 16.5813 113.275 16.432C112.79 15.9467 112.118 15.536 111.259 15.2C110.4 14.864 109.579 14.696 108.795 14.696C107.544 14.696 106.546 14.9573 105.799 15.48C105.071 15.984 104.707 16.656 104.707 17.496C104.707 18.4107 105.071 19.1107 105.799 19.596C106.546 20.0813 107.647 20.492 109.103 20.828C110.559 21.1453 111.744 21.5187 112.659 21.948C113.592 22.3773 114.311 22.9747 114.815 23.74C115.319 24.5053 115.571 25.504 115.571 26.736C115.571 27.8187 115.263 28.78 114.647 29.62C114.05 30.46 113.228 31.1133 112.183 31.58C111.138 32.0467 109.99 32.28 108.739 32.28Z" className="fill-slate-700 dark:fill-white transition-all duration-500" />
          </svg>
        </a>
        <div className="font-[Quicksand] font-medium text-lg gap-16 flex text-slate-700 dark:text-white transition-all duration-500">
          <button className="flex font-medium items-center gap-1" type="button" onClick={() => toggleDropdown(!isDropdownShow)}>
            Servers
            <Icon icon="uil:angle-down" className="w-5 h-5 mt-1" />
          </button>
          <a href="/">Search</a>
          <a href="/">Blog</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>
        <button type="button" className="p-3 rounded-md bg-amber-400 shadow-md" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.09 3.32001C16.1703 2.56359 15.0933 2.02204 13.9377 1.73485C12.782 1.44767 11.5768 1.4221 10.41 1.66001C8.85638 1.97383 7.43099 2.74208 6.31469 3.86729C5.19838 4.99249 4.44147 6.42394 4.14 7.98001C3.91985 9.14673 3.95985 10.3477 4.25716 11.4971C4.55448 12.6466 5.10177 13.7163 5.86 14.63C6.56369 15.4241 6.96704 16.4395 7 17.5V20.5C7 21.2957 7.31607 22.0587 7.87868 22.6213C8.44129 23.1839 9.20435 23.5 10 23.5H14C14.7957 23.5 15.5587 23.1839 16.1213 22.6213C16.6839 22.0587 17 21.2957 17 20.5V17.69C17.0336 16.5192 17.4637 15.3944 18.22 14.5C19.5451 12.8608 20.1698 10.7648 19.9582 8.66763C19.7466 6.57044 18.7159 4.64149 17.09 3.30001V3.32001ZM15 20.5C15 20.7652 14.8946 21.0196 14.7071 21.2071C14.5196 21.3947 14.2652 21.5 14 21.5H10C9.73479 21.5 9.48043 21.3947 9.2929 21.2071C9.10536 21.0196 9 20.7652 9 20.5V19.5H15V20.5ZM16.67 13.26C15.6645 14.4526 15.0779 15.942 15 17.5H13V14.5C13 14.2348 12.8946 13.9804 12.7071 13.7929C12.5196 13.6054 12.2652 13.5 12 13.5C11.7348 13.5 11.4804 13.6054 11.2929 13.7929C11.1054 13.9804 11 14.2348 11 14.5V17.5H9C8.97362 15.9681 8.40695 14.4948 7.4 13.34C6.73564 12.544 6.28889 11.5894 6.10331 10.5694C5.91773 9.54928 5.99965 8.49852 6.34109 7.51954C6.68253 6.54055 7.27182 5.66675 8.05153 4.98333C8.83123 4.29992 9.77472 3.83021 10.79 3.62001C11.6626 3.44035 12.5642 3.45725 13.4294 3.66948C14.2946 3.8817 15.1017 4.28393 15.7921 4.84696C16.4824 5.40999 17.0388 6.11969 17.4207 6.92453C17.8026 7.72937 18.0005 8.60915 18 9.50001C18.0074 10.8699 17.5371 12.1995 16.67 13.26Z" fill="white" />
          </svg>
        </button>
      </nav>
      <div className={`w-full flex gap-56 transition-all font-[Quicksand] duration-500 shadow-md bg-white dark:bg-zinc-600 overflow-hidden px-16 ${isDropdownShow ? 'max-h-[22rem] py-8' : 'max-h-0'}`}>
        <div className="text-slate-400 dark:text-amber-400 transition-all duration-500">
          <h3 className="text-lg font-medium">Servers by gamemode</h3>
          <div className="text-slate-700 dark:text-white transition-all duration-500 grid grid-rows-6 grid-flow-col text-lg gap-y-2 gap-x-12 mt-4">
            {['Vanilla', 'Towny', 'Survival', 'Skyblock', 'RPG', 'PvP', 'PvE', 'Prison', 'Pixelmon', 'Parkour', 'Minigames', 'KitPvP', 'Hunger Games', 'HCF', 'FTB', 'Factions', 'Economy', 'Creative'].map((e) => <a href={`/category/${e.toLowerCase().replace(/\s/g, '-')}`}>{e}</a>)}
          </div>
          <a className="text-slate-700 dark:text-white text-lg mt-1 block" href="/category/anarchy">Anarchy</a>
        </div>
        <div className="text-slate-400 dark:text-amber-400 transition-all duration-500">
          <h3 className="text-lg font-medium">Servers by version</h3>
          <div className="text-slate-700 dark:text-white transition-all duration-500 grid grid-rows-6 grid-flow-col text-lg gap-y-2 gap-x-12 mt-4">
            {Array(12).fill(0).map((_, i) => (
              <a href={`/version/1.${18 - i}`}>
                1.
                {18 - i}
              </a>
            ))}
          </div>
        </div>
        <div className="text-slate-400 dark:text-amber-400 transition-all duration-500">
          <h3 className="text-lg font-medium">General</h3>
          <div className="text-slate-700 dark:text-white transition-all duration-500 text-lg grid gap-y-2 mt-4">
            {['Java', 'Bedrock', 'New', 'Popular', 'Whitelist'].map((e) => (
              <a href={`/${e.toLowerCase()}`}>
                {e}
                {' '}
                Servers
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Navbar.propTypes = {
  setTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Navbar;
