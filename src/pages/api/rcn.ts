import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

async function getRandomWordFromFile(fileName: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), "src/pages/api", fileName);
    const data = await fs.readFile(filePath, "utf-8");
    const words = data.split("\n").filter((word) => word.trim() !== ""); // Filter out empty lines
    if (words.length === 0) {
      console.error(`${fileName} is empty or contains only empty lines.`);
      return "";
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex]!;
  } catch (error) {
    throw new Error(`Error reading ${fileName}`);
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
  } catch (error) {
    res.status(500).json({ error: "error occurred" });
  }
}
