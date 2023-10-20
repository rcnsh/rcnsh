import { type AppType } from "next/dist/shared/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import Footer from "@/components/footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={`bg-[#171717] font-mono ${jetbrainsMono.variable} m-auto min-h-screen w-[50%]`}
    >
      <Component {...pageProps} />
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
