// Rewrites the writing section of README.md from the rcn.sh RSS feed.
// Run by .github/workflows/readme.yml. The listening line is live, served by
// rcn.sh/now.svg, so it isn't generated here.
import { readFile, writeFile } from 'node:fs/promises';

const FEED = 'https://rcn.sh/rss.xml';
const TZ = 'Asia/Singapore';
const POSTS = 3;

async function get(url) {
  const res = await fetch(url);
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

function replace(readme, name, lines) {
  const pattern = new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(<!-- ${name}:end -->)`);
  if (!pattern.test(readme)) throw new Error(`README.md has no ${name}:start/${name}:end markers`);
  return readme.replace(pattern, (_, start, end) => `${start}\n${lines.join('\n')}\n${end}`);
}

let readme = await readFile('README.md', 'utf8');
readme = replace(readme, 'writing', await writing());
await writeFile('README.md', readme);
