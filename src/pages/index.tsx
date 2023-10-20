import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";
import { useEffect, useState } from "react";
import Image from "next/image";

type Repo = {
  name: string;
  description: string;
  html_url: string;
};

export default function Home({ repoData }: { repoData: Repo[] }) {
  const [rcn, setRcn] = useState<string>("");

  const repos = repoData.slice(0, 6);
  const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());
  const { data: spotifyData } = useSWR("/api/spotify", fetcher);

  useEffect(() => {
    const fetchRcnData = async () => {
      try {
        const response = await fetch("/api/rcn");
        const rcnData = await response.json();
        setRcn(rcnData.randomWords || "");
      } catch (error) {
        console.error("Error fetching rcnData:", error);
      }
    };

    fetchRcnData().catch((error) => {
      console.error("Error fetching rcnData:", error);
    });
  }, []);

  return (
    <>
      <Head>
        <title>rcn</title>
        <meta name="description" content="rcn.sh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"container m-auto min-h-screen w-[50%] p-8"}>
        <section className="flex justify-center p-6">
          <Image src={"/rcnLogo.png"} alt={""} height={128} width={128} />
        </section>
        <span className={"flex justify-center text-[#cdc8c2]"}>{rcn}</span>
        <br />
        <section className={"container p-2 py-5 text-[#cdc8c2]"}>
          Hi! I&apos;m <b>Jacob</b> (aka{" "}
          <span className={"text-[#2d5c9a]"}>r</span>
          <span className={"text-[#cdc8c2]"}>c</span>
          <span className={"text-[#5a66af]"}>n</span>), a computer science
          student in <b>Year 13</b>. I&apos;m currently working on a few
          projects, such as my{" "}
          <Link
            href={"https://github.com/RCNOverwatcher/virtue-gymnastics-website"}
            className={
              "text-[#2d5c9a] visited:text-[#5a66af] hover:text-[#cdc8c2]"
            }
          >
            NEA
          </Link>{" "}
          (Non-Exam Assessment) for <b>A-Level Computer Science</b>.
        </section>
        <section className={"container p-2 py-5 text-[#cdc8c2]"}>
          My main programming languages are TypeScript and Python, but I also
          know a bit of Rust and Visual Basic.
        </section>
        <section className={"container p-2 py-5"}>
          {repos.length > 0 ? (
            <>
              <h2 className={"py-4 text-xl text-white"}>
                My GitHub Repositories
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {repos.map((repo: Repo) => (
                  <div key={repo.name} className="p-6">
                    <Link
                      className={
                        "text-[#2d5c9a] underline visited:text-[#5a66af] hover:text-[#cdc8c2]"
                      }
                      href={repo.html_url}
                    >
                      {repo.name}
                    </Link>
                    <br />
                    <span className={"text-[#cdc8c2]"}>{repo.description}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2 className={"text-[#2d5c9a]"}>Loading...</h2>
          )}
        </section>
        <section className={"container p-2 py-5 text-[#cdc8c2]"}>
          <Link
            target="_blank"
            rel="noopener noreferer"
            href={
              spotifyData?.isPlaying
                ? spotifyData.songUrl
                : "https://open.spotify.com/user/nz3i2a30ep85rv5ymcpglhndj"
            }
            className="relative m-auto flex w-72 items-center space-x-4 rounded-md p-5 transition-shadow hover:shadow-md"
          >
            <div className="w-16">
              {spotifyData?.isPlaying ? (
                <Image
                  className="w-16 shadow-sm"
                  src={spotifyData?.albumImageUrl}
                  alt={spotifyData?.album}
                  width={64}
                  height={64}
                />
              ) : (
                <SiSpotify size={64} color={"#1ED760"} />
              )}
            </div>
            <div className="flex-1">
              <p className="component font-bold">
                {spotifyData?.isPlaying ? spotifyData.title : "Not Listening"}
              </p>
              <p className="font-dark text-xs">
                {spotifyData?.isPlaying ? spotifyData.artist : "Spotify"}
              </p>
            </div>
            <div className="absolute bottom-1.5 right-1.5">
              <SiSpotify size={20} color={"#1ED760"} />
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const username = "RCNOverwatcher";
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    const repoData = repos.map((repo: Repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
    }));

    return {
      props: { repoData },
    };
  } catch (error) {
    console.error("Error fetching data from GitHub API:", error);
    return {
      props: { repoData: [] },
    };
  }
};
