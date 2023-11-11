import { type AppType } from "next/dist/shared/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font";
import useKonami from "react-use-konami";
import { clsx } from "clsx";

import "@/styles/globals.css";
import Layout from "@/pages/Layout";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import React, { useState } from "react";

const App: AppType = ({ Component, pageProps }) => {
  const [partyMode, setPartyMode] = useState(false);
  useKonami(() => {
    setPartyMode(true);
  });

  useKonami(
    () => {
      const barlow = new Audio(
        "https://res.cloudinary.com/dtqhs8nvm/video/upload/f_auto:video,q_auto/d7pioi3ipstvuebvp64p",
      );
      barlow.play();
    },
    {
      code: ["b", "a", "r", "l", "o", "w"],
    },
  );

  return (
    <main
      className={clsx(
        partyMode && "scene",
        "overflow-x-hidden",
        !partyMode && "bg-[#171717]",
      )}
    >
      <div className={clsx(partyMode && "canvas", "min-h-[100dvh]")}>
        <div
          className={`font-mono ${GeistMono.className} m-auto w-[80%] text-center text-[#cdc8c2] md:w-[50%] md:text-left`}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
          <footer className={"flex justify-evenly"}>
            <span className={"font-bold text-[#cdc8c2]"}>Jacob Wiltshire</span>
            <section>
              <Link
                href={"https://github.com/RCNOverwatcher"}
                aria-label={"My Github"}
              >
                <FaGithub size={32} color={"white"} />
              </Link>
            </section>
          </footer>
          <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
          <Analytics />
        </div>
      </div>
      <div className={clsx(partyMode && "backdrop")}></div>
      <div className={clsx(partyMode && "noise")}></div>
      <div className={clsx(partyMode && "dots")}></div>
    </main>
  );
};

export default App;
