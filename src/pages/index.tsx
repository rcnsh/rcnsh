import Link from "next/link";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";
import Image from "next/image";

type Repo = {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
};

export default function Home({ repoData }: { repoData: Repo[] }) {
  const repos = repoData.slice(0, 6);

  const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());
  const { data: spotifyData } = useSWR("/api/spotify", fetcher);

  return (
    <>
      <br />
      <section className={"container p-2 py-5 text-base"}>
        Hi! I&apos;m <b>Jacob</b> (aka rcn), a computer science student in{" "}
        <b>Year 13</b>. I&apos;m currently working on a few projects, such as my{" "}
        <Link
          href={"https://github.com/RCNOverwatcher/virtue-gymnastics-website"}
          className={"text-[#737dbb] hover:text-[#cdc8c2]"}
        >
          NEA
        </Link>{" "}
        (Non-Exam Assessment) for <b>A-Level Computer Science</b>.
      </section>
      <section className={"container p-2 py-5 text-[#cdc8c2]"}>
        My main programming languages are TypeScript and Python, with my primary
        frontend framework being Next.js, but I also know a bit of Rust and
        Visual Basic.
      </section>
      <section className={"container p-2 py-5"}>
        {repos.length > 0 ? (
          <>
            <h2
              className={
                "flex justify-center py-4 text-xl font-bold text-white"
              }
            >
              My GitHub Repositories
            </h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
              {repos.map((repo: Repo) => (
                <div
                  key={repo.name}
                  className="flex-col rounded-xl p-6 shadow-md"
                >
                  <Link
                    className={"text-[#737dbb] underline hover:text-[#cdc8c2]"}
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
      <section className={"py-5 text-[#cdc8c2]"}>
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
                src={spotifyData.albumImageUrl}
                alt={spotifyData.album}
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
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const username = "RCNOverwatcher";
    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });
    const repos = await res.json();

    const repoNamesToInclude = [
      "rcnsh",
      "notes",
      "virtue-gymnastics-website",
      "RaspberryPyGame",
      "Edexcel-Large-Data-Set-Analysis",
      "fast_inverse_square_root",
    ];

    const filteredRepos = repos
      .map((repo: Repo) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
      }))
      .filter((repo: Repo) => repoNamesToInclude.includes(repo.name));

    return {
      props: {
        repoData: filteredRepos,
      },
      revalidate: 86400,
    };
  } catch (error) {
    console.error("Error fetching data from GitHub API:", error);
    return {
      props: { repoData: [] },
      revalidate: 86400,
    };
  }
};
