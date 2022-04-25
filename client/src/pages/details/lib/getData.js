import cleanupData from './cleanupData';

export default async function getData(id) {
  const raw = await fetch(
    `https://cors-anywhere.thecodeblog.net/minecraft.buzz/server/${id}`,
    { cache: 'no-store' },
  ).then((res) => res.text());
  const HTMLParser = new DOMParser();
  const html = HTMLParser.parseFromString(raw, 'text/html');
  const data = {
    thumbnail: html.querySelector('section header img').src,
    name: html.querySelector('section header h1').innerText.trim(),
    .../^(?<status>Online|Offline)\s+(-|\|)\s+(?<votes>\d+)\s+Vote\(s\),\s+(?<reviewCount>(?:\d+|No))\s+Review(?:s|\(s\))(?:,\s+Rated:\s+(?<rate>\d)\/5)?./.exec(
      html.querySelector('section header #vote-line').innerText.trim(),
    ).groups,
    website:
      Array.from(html.querySelectorAll('a.btn.btn-light.p-2.p-sm-3.py-3'))
        .filter((e) => e.innerText.trim() === 'Website')
        .shift()?.href || null,
    discord:
      Array.from(html.querySelectorAll('a.btn.btn-light.p-2.p-sm-3.py-3'))
        .filter((e) => e.innerText.trim() === 'Discord')
        .shift()?.href || null,
    ...cleanupData(html.querySelectorAll('#servertable > div')),
    desc: html
      .querySelectorAll('section')[1]
      .querySelector('p')
      .innerHTML.trim(),
    similar: Array.from(html.querySelectorAll('.server-listing')).map((e) => ({
      name: e.querySelector('h3').innerText.trim(),
      thumbnail: e.querySelector('img').src,
      info: e
        .querySelector('.flex-grow-1.ms-3 > i')
        .innerText.trim()
        .replace(',', ''),
      rates: e
        .querySelector('strong')
        .innerText.trim()
        .split(' ')
        .pop()
        .split('/')
        .shift(),
      onlinePlayers: e
        .querySelector('.flex-grow-1.ms-3')
        .innerHTML.split('<br>')[1]
        .replace(',', ''),
      link: `/server/${e.querySelector('a').href.split('/').pop()}`,
    })),
  };
  return data;
}
