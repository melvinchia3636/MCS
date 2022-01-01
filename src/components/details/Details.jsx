import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const getData = (id) => {
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
    return d;
  };

  fetch(`https://cors-anywhere.thecodeblog.net/minecraft.buzz/server/${id}`).then((res) => res.text()).then((raw) => {
    const HTMLParser = new DOMParser();
    const html = HTMLParser.parseFromString(raw, 'text/html');
    const data = {
      thumbnail: html.querySelector('section header img').src,
      name: html.querySelector('section header h1').innerText.trim(),
      .../^(?<status>Online|Offline)\s+-\s+(?<votes>\d+)\s+Vote\(s\),\s+(?<reviewCount>\d+)\s+Review\(s\),\s+Rated:\s+(?<rate>\d)\/5.$/.exec(html.querySelector('section header #vote-line').innerText.trim()).groups,
      website: Array.from(html.querySelectorAll('a.btn.btn-light.p-2.p-sm-3.py-3')).filter((e) => e.innerText.trim() === 'Website').shift()?.href || null,
      discord: Array.from(html.querySelectorAll('a.btn.btn-light.p-2.p-sm-3.py-3')).filter((e) => e.innerText.trim() === 'Discord').shift()?.href || null,
      data: cleanupData(html.querySelectorAll('#datadiv > div')),
    };
    console.log(data);
  });
};

function Details() {
  const params = useParams();
  const location = useLocation();

  React.useEffect(() => getData(parseInt(params.id, 10)), [location]);

  return (
    <>
      <p>smth</p>
      smth
    </>
  );
}

export default Details;
