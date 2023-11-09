import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
type LayoutProps = React.PropsWithChildren;

async function fetchTextFile(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error: any) {
    throw new Error(`Error fetching ${url}: ${error.message}`);
  }
}

async function getRandomWords(): Promise<string> {
  try {
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

    if (rWords.length === 0 || cWords.length === 0 || nWords.length === 0) {
      console.error(
        "One or more of the files is empty or contains only empty lines.",
      );
      return "";
    }

    const randomRWord = rWords[Math.floor(Math.random() * rWords.length)];
    const randomCWord = cWords[Math.floor(Math.random() * cWords.length)];
    const randomNWord = nWords[Math.floor(Math.random() * nWords.length)];

    return `${randomRWord} ${randomCWord} ${randomNWord}`;
  } catch (error) {
    throw new Error(`Error reading online files`);
  }
}

export default function Layout({ children }: LayoutProps) {
  const [rcn, setRcn] = useState<string>("​");

  useEffect(() => {
    const fetchRcnData = async () => {
      try {
        const rcnData = await getRandomWords();
        setRcn(rcnData || "​");
      } catch (error) {
        console.error("Error fetching rcnData:", error);
      }
    };

    fetchRcnData().catch((error) => {
      console.error("Error fetching rcnData:", error);
    });
    const intervalId = setInterval(() => {
      fetchRcnData().catch((error) => {
        console.error("Error fetching rcnData:", error);
      });
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>rcn.sh</title>
        <meta name="description" content="rcn.sh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={" container p-5"}>
        <section className="flex justify-center p-6">
          <Image
            src={"/rcnLogo.png"}
            alt={"rcn logo"}
            height={128}
            width={128}
            loading={"eager"}
          />
        </section>

        <span className={"flex justify-center text-[#cdc8c2]"}>{rcn}</span>
        {children}
      </main>
    </>
  );
}
