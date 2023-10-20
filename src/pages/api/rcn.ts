import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

async function getRandomWordFromFile(fileName: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), "src/pages/api", fileName);
    const data = await fs.readFile(filePath, "utf-8");
    const words = data.split("\n");
    if (words.length === 0) {
      console.error(`${fileName} is empty or contains only empty lines.`);
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    // @ts-ignore
    return words[randomIndex];
  } catch (error: any) {
    throw new Error(`Error reading ${fileName}: ${error.message}`);
  }
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const [rWord, cWord, nWord] = await Promise.all([
      getRandomWordFromFile("r.txt"),
      getRandomWordFromFile("c.txt"),
      getRandomWordFromFile("n.txt"),
    ]);

    const formattedString = `${rWord} ${cWord} ${nWord}`;

    res.status(200).json({ randomWords: formattedString });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
