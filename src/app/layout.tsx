import "@/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import React from "react";

export const metadata = {
  title: "rcn.sh",
  description: "rcn.sh",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-mono ${GeistMono.className}`}>{children}</body>
    </html>
  );
}
