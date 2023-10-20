import { type AppType } from "next/dist/shared/lib/utils";
import { JetBrains_Mono } from "next/font/google";

import "@/styles/globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`bg-[#171717] font-mono ${jetbrainsMono.variable} `}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
