export default function cleanupData(data) {
  const d = Array.from(data)
    .map((e) => Array.from(e.querySelectorAll('div'))
      .map((f, i) => (i ? f : f.innerText.trim().replace(/\s/g, '')))
      .slice(0, 2))
    .map(([k, v]) => {
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
          r = [
            v.innerText.trim(),
            v.querySelector('img').src.split('/').pop().split('.')[0],
          ];
          break;
        default:
          r = v.innerText.trim();
      }
      return [k[0].toLowerCase() + k.slice(1), r];
    });
  return Object.fromEntries(d);
}
