import { type AppType } from "next/dist/shared/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import Footer from "@/components/footer";
import Layout from "@/pages/Layout";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={`bg-[#171717] font-mono ${jetbrainsMono.variable} m-auto w-[80%] text-center text-[#cdc8c2] md:w-[50%] md:text-left`}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
