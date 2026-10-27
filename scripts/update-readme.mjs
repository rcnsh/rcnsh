// Rewrites the generated sections of README.md: the latest posts from the
// rcn.sh RSS feed, and this week's listening from music-warehouse.
// Run by .github/workflows/readme.yml. Needs MUSIC_WAREHOUSE_TOKEN (read-only).
import { readFile, writeFile } from 'node:fs/promises';

const FEED = 'https://rcn.sh/rss.xml';
const WAREHOUSE = 'https://music-api.rcn.sh';
const TZ = 'Asia/Singapore';
const POSTS = 3;

async function get(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res;
}

function decode(s) {
  return s
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();
}

// Square brackets would end a markdown link's text early.
const md = (s) => s.replace(/([[\]])/g, '\\$1');

async function writing() {
  const xml = await (await get(FEED)).text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const tag = (name) => decode(item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? '');
    return { title: tag('title'), link: tag('link'), description: tag('description'), date: new Date(tag('pubDate')) };
  });
  items.sort((a, b) => b.date - a.date);
  return items.slice(0, POSTS).map(({ title, link, description, date }) => {
    const when = date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: TZ }).toLowerCase();
    const about = description.replace(/\.$/, '');
    const blurb = about ? `: ${about.charAt(0).toLowerCase()}${about.slice(1)}` : '';
    return `- [${md(title)}](${link}) · ${when}${blurb}.`;
  });
}

// YYYY-MM-DD in TZ, `daysAgo` days back.
function localDay(daysAgo) {
  return new Date(Date.now() - daysAgo * 86_400_000).toLocaleDateString('en-CA', { timeZone: TZ });
}

async function listening() {
  const token = process.env.MUSIC_WAREHOUSE_TOKEN;
  if (!token) throw new Error('MUSIC_WAREHOUSE_TOKEN is not set');
  const range = `from=${localDay(6)}&to=${localDay(0)}&tz=${encodeURIComponent(TZ)}&limit=1`;
  const api = async (path) =>
    (await get(`${WAREHOUSE}${path}?${range}`, { headers: { Authorization: `Bearer ${token}` } })).json();
  const [{ tracks }, { artists }] = await Promise.all([api('/api/top-tracks'), api('/api/top-artists')]);

  const parts = [];
  const track = tracks[0];
  if (track) {
    // Imported plays can carry a `name:` placeholder instead of a Spotify id.
    const name = track.id.startsWith('name:') ? md(track.name) : `[${md(track.name)}](https://open.spotify.com/track/${track.id})`;
    parts.push(`on repeat: ${name}${track.artist ? ` by ${track.artist}` : ''}`);
  }
  if (artists[0] && artists[0].name !== track?.artist) parts.push(`most played artist: ${artists[0].name}`);
  return parts.length ? [`${parts.join(' · ')} (last 7 days)`] : ['nothing played in the last 7 days.'];
}

function replace(readme, name, lines) {
  const pattern = new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(<!-- ${name}:end -->)`);
  if (!pattern.test(readme)) throw new Error(`README.md has no ${name}:start/${name}:end markers`);
  return readme.replace(pattern, (_, start, end) => `${start}\n${lines.join('\n')}\n${end}`);
}

let readme = await readFile('README.md', 'utf8');
readme = replace(readme, 'writing', await writing());
readme = replace(readme, 'listening', await listening());
await writeFile('README.md', readme);
