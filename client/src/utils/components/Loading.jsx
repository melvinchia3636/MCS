/* eslint-disable global-require */
import React from 'react';
import Lottie from 'react-lottie';
import loadingAnim from '../animations/loading.json';

function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 flex items-center justify-center shadow-[0_6px_12px_rgba(0,0,0,.15)] bg-white dark:bg-zinc-600 rounded-lg">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: loadingAnim,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={60}
          width={60}
          isStopped={false}
          isPaused={false}
        />
      </div>
    </div>
  );
}

export default Loading;
