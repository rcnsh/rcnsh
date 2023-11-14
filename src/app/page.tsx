import Image from "next/image";
import Party from "@/app/components/party";
import { Suspense } from "react";
import { RCN } from "@/app/components/rcn";
import Link from "next/link";
import Repos, { ReposSkeleton } from "@/app/components/repos";
import NowPlaying from "@/app/components/spotify";
import { SiSpotify } from "react-icons/si";

interface NowPlayingResult {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

export default async function HomePage() {
  const { album, albumImageUrl, artist, isPlaying, songUrl, title } =
    (await NowPlaying()) as NowPlayingResult;

  return (
    <Party>
      <section className="flex justify-center p-6">
        <Image src={"/rcnLogo.png"} alt={"rcn logo"} height={128} width={128} />
      </section>
      <Suspense fallback={<div>​</div>}>
        <RCN />
      </Suspense>
      <section>
        <br />
        <section className={"container p-2 py-5 text-base"}>
          Hi! I&apos;m <b>Jacob</b> (aka rcn), a computer science student in{" "}
          <b>Year 13</b>. I&apos;m currently working on a few projects, such as
          my{" "}
          <Link
            href={"https://github.com/RCNOverwatcher/virtue-gymnastics-website"}
            className={"text-[#737dbb] hover:text-[#cdc8c2]"}
          >
            NEA
          </Link>{" "}
          (Non-Exam Assessment) for <b>A-Level Computer Science</b>.
        </section>
        <section className={"container p-2 py-5 text-[#cdc8c2]"}>
          My main programming languages are TypeScript and Python, with my
          primary frontend framework being Next.js, but I also know a bit of
          Rust and Visual Basic.
        </section>
        <section className={"container p-2 py-5"}>
          <h2
            className={"flex justify-center py-4 text-xl font-bold text-white"}
          >
            My GitHub Repositories
          </h2>
          <Suspense fallback={<ReposSkeleton />}>
            <Repos />
          </Suspense>
        </section>
        <section className={"py-5 text-[#cdc8c2]"}>
          <Suspense fallback={<div>skeleton</div>}>
            <Link
              target="_blank"
              rel="noopener noreferer"
              href={
                isPlaying
                  ? songUrl
                  : "https://open.spotify.com/user/nz3i2a30ep85rv5ymcpglhndj"
              }
              className="relative m-auto flex w-72 items-center space-x-4 rounded-md p-5 transition-shadow hover:shadow-md"
            >
              <div className="w-16">
                {isPlaying ? (
                  <Image
                    className="w-16 shadow-sm"
                    src={albumImageUrl}
                    alt={album}
                    width={64}
                    height={64}
                  />
                ) : (
                  <SiSpotify size={64} color={"#1ED760"} />
                )}
              </div>
              <div className="flex-1">
                <p className="component font-bold">
                  {isPlaying ? title : "Not Listening"}
                </p>
                <p className="font-dark text-xs">
                  {isPlaying ? artist : "Spotify"}
                </p>
              </div>
              <div className="absolute bottom-1.5 right-1.5">
                <SiSpotify size={20} color={"#1ED760"} />
              </div>
            </Link>
          </Suspense>
        </section>
      </section>
    </Party>
  );
}
