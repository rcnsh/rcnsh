async function fetchTextFile(url: string) {
  const response = await fetch(url);
  return await response.text();
}

export async function GetRCN() {
  const [rText, cText, nText] = await Promise.all([
    fetchTextFile(
      "https://gist.githubusercontent.com/RCNOverwatcher/9a0474af985c350e551effeeb10ffda5/raw/eaafbf8b9484f1ad76bcd592e14814b166615543/r.txt",
    ),
    fetchTextFile(
      "https://gist.githubusercontent.com/RCNOverwatcher/87d6aae558377e7963bdf0100a7ab42d/raw/3b761bb8fc424da4f233402a361ce3fdc389b146/c.txt",
    ),
    fetchTextFile(
      "https://gist.githubusercontent.com/RCNOverwatcher/c55b70e6346388015cfe3b37a8b4e45a/raw/a5e978162e8113691986fbddc093103c85563de0/n.txt",
    ),
  ]);

  const rWords = rText.split("\n").filter((word) => word.trim() !== "");
  const cWords = cText.split("\n").filter((word) => word.trim() !== "");
  const nWords = nText.split("\n").filter((word) => word.trim() !== "");

  const randomRWord = rWords[Math.floor(Math.random() * rWords.length)];
  const randomCWord = cWords[Math.floor(Math.random() * cWords.length)];
  const randomNWord = nWords[Math.floor(Math.random() * nWords.length)];

  return `${randomRWord} ${randomCWord} ${randomNWord}`;
}

export async function RCN() {
  const rcn = await GetRCN();
  return <div className={"flex justify-center"}>{rcn}</div>;
}
