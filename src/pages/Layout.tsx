import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/dialog";
import { useKonami } from "react-konami-code";

type LayoutProps = React.PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
  const [rcn, setRcn] = useState<string>("​");
  const [dialogOpen, setDialogOpen] = useState(false);
  useKonami(() => {
    setDialogOpen(true);
  });

  useEffect(() => {
    const fetchRcnData = async () => {
      try {
        const response = await fetch("/api/rcn");
        const rcnData = await response.json();
        setRcn(rcnData.randomWords || "​");
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
      <main className={"container p-5"}>
        <section className="flex justify-center p-6">
          <Image
            src={"/rcnLogo.png"}
            alt={"rcn logo"}
            height={128}
            width={128}
            loading={"eager"}
          />
        </section>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className={"flex justify-center"}>
            <DialogTitle>You found me! Congrats?</DialogTitle>
          </DialogContent>
        </Dialog>
        <span className={"flex justify-center text-[#cdc8c2]"}>{rcn}</span>
        {children}
      </main>
    </>
  );
}
