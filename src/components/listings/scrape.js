const getData = async (url, currentPage) => {
  const raw = await fetch(url).then((res) => res.text());
  const HTMLParser = new DOMParser();
  const html = HTMLParser.parseFromString(raw, 'text/html');
  const d = Array.from(html.querySelectorAll('.server-row')).map((e) => ({
    id: e.querySelector('a').href.split('/').pop(),
    thumbnail: e.querySelector('img[src*=favicon]').src,
    banner: e.querySelector('img[src*=banner]').src,
    ip: e.querySelector('.ip-block').innerText,
    version: e.querySelector("span[title='Server Version']").innerText.trim(),
    gamemode: e.querySelector("span[title='Main Gamemode']").innerText.trim(),
    playersOnline: e.querySelector("span[title='Players Online']")?.innerText?.trim() || 'Not Available',
    serverType: e.querySelector("span[title='Server Type']").innerText.trim(),
    rating: e.querySelectorAll('.fa-star').length,
    status: e.querySelector('.badge.fs-6')?.innerText?.trim(),
  }));
  const t = {
    title: html.querySelector('h1').innerText.trim(),
    desc: currentPage === 1 ? html.querySelector('h1').nextElementSibling.innerText.trim() : '',
    pagination: Array.from(html.querySelectorAll('.pagination .page-link')).map((e) => e.innerText.trim()),
  };
  return [d, t];
};

export default getData;
