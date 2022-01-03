const getData = async (url, currentPage) => {
  const raw = await fetch(url, { cache: 'no-store' }).then((res) => res.text());
  const HTMLParser = new DOMParser();
  const html = HTMLParser.parseFromString(raw, 'text/html');
  const d = Array.from(html.querySelectorAll('.server-row')).filter((e) => !e.querySelector('i[title="Sponsored Server"]')).map((e) => ({
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
  const c = Array.from(html.querySelectorAll('.dropdown-menu a')).filter((e) => e.href.match(new RegExp(`${window.location.pathname.split('/').pop()}/${currentPage.toString()}&filter_country=[A-Z]{2}$`))).map(((e) => [e.innerText.trim(), e.href.split('=').pop()])).sort();
  console.log(c);
  return [d, t, c];
};

export default getData;
