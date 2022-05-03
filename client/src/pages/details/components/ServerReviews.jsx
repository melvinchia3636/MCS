import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import { useLocation, useParams } from 'react-router';

import loadingAnim from '../../../utils/animations/loading-white.json';

const getReview = async (id, limit) => {
  const reviewRaw = await fetch(`http://localhost:3001/review/${id}/${limit}`).then((res) => res.text());
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

function ServerReviews() {
  const params = useParams();
  const location = useLocation();
  const [review, setReview] = React.useState([]);
  const [isLoadingReview, setIsLoadingReview] = React.useState(false);
  const [nextLimit, setNextLimit] = React.useState(0);

  const showMore = () => {
    setIsLoadingReview(true);
    getReview(parseInt(params.id, 10), nextLimit).then(([newReview, newLimit]) => {
      setReview(review.concat(newReview));
      setNextLimit(newLimit);
      setIsLoadingReview(false);
    });
  };

  useEffect(() => {
    getReview(parseInt(params.id, 10), nextLimit).then(([newReview, newLimit]) => {
      setReview(review.concat(newReview));
      setNextLimit(newLimit);
    });
  }, [location]);

  return (
    <>
      <h2 className="text-zinc-400 text-2xl font-medium mt-12">Server Reviews</h2>
      <div className="flex flex-col gap-4 mt-4">
        {review.length ? review.map((e) => (
          <div className="text-zinc-700 dark:text-white bg-white dark:bg-zinc-600 transition-all duration-500 p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,.10)]">
            <div className="flex gap-4 items-center">
              <img src={e.avatar} className="rounded-md" alt={e.name} />
              <div>
                <h4 className="font-medium text-2xl">{e.name}</h4>
                <div className="flex gap-1 mt-1">
                  {Array(parseInt(e.rating, 10) || 0).fill(0).map(() => <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />)}
                  {Array(5 - (parseInt(e.rating, 10) || 0)).fill(0).map(() => <div className="w-2.5 h-2.5 border-2 border-amber-400 rounded-full" />)}
                </div>
                <p className="text-zinc-400 font-medium mt-1">{e.date}</p>
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
    </>
  );
}

export default ServerReviews;
