export default async function getData() {
  const raw = await fetch('https://cors-anywhere.thecodeblog.net/minecraft.buzz', { cache: 'no-store' }).then((res) => res.text());
  const HTMLParser = new DOMParser();
  const html = HTMLParser.parseFromString(raw, 'text/html');

  const d = Array.from(html.querySelectorAll('.row > section[itemtype*=Table]')).map((f) => Array.from(f.querySelectorAll('.server-row')).map((e) => ({
    id: e.querySelector('a').href.split('/').pop(),
    thumbnail: e.querySelector('img[src*=favicon]').src,
    banner: e.querySelector('img[src*=banner]')?.src,
    video: e.querySelector('video source')?.dataset.src,
    ip: e.querySelector('.ip-block').innerText,
    version: e.querySelector("span[title='Server Version']").innerText.trim(),
    gamemode: e.querySelector("span[title='Main Gamemode']").innerText.trim(),
    playersOnline: e.querySelector('td:nth-child(5)')?.innerText?.trim() || 'Not Available',
    serverType: e.querySelector("span[title='Server Type']").innerText.trim(),
    status: e.querySelector('.badge.fs-6')?.innerText?.trim(),
  })));

  return d;
}
