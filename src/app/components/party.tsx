"use client";

import useKonami from "react-use-konami";
import { cn } from "@/app/lib/utils";
import React, { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

function Party({ children }: { children: React.ReactNode }) {
  const [partyMode, setPartyMode] = useState(false);
  useKonami(() => {
    setPartyMode(true);
  });
  return (
    <main
      className={cn(
        partyMode && "scene",
        "h-[100dvh] min-h-[100dvh] w-[100dvw] overflow-x-hidden",
        !partyMode && "bg-[#171717]",
      )}
    >
      <section className={cn(partyMode && "canvas")}>
        <section
          className={
            " m-auto w-[80%] text-center text-[#cdc8c2] md:w-[50%] md:text-left"
          }
        >
          {children}
          <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
          <footer className={"flex justify-evenly"}>
            <span className={"font-bold text-[#cdc8c2]"}>Jacob Wiltshire</span>
            <section>
              <Link
                href={"https://github.com/rcnsh"}
                aria-label={"My Github"}
              >
                <FaGithub size={32} color={"white"} />
              </Link>
            </section>
          </footer>
          <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
        </section>
        <div className={cn(partyMode && "backdrop")}></div>
        <div className={cn(partyMode && "noise")}></div>
        <div className={cn(partyMode && "dots")}></div>
      </section>
    </main>
  );
}

export default Party;
