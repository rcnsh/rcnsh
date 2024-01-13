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
      <head>
        <script
          defer
          src="https://eu.umami.is/script.js"
          data-website-id="1d2fd91e-c319-4073-a31f-1f1507cfccc3"
        ></script>
        <title>rcn.sh</title>
      </head>
      <body className={`font-mono ${GeistMono.className}`}>{children}</body>
    </html>
  );
}
