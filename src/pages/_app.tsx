import { type AppType } from "next/dist/shared/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font";

import "@/styles/globals.css";
import Footer from "@/components/footer";
import Layout from "@/pages/Layout";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <main className={"scene overflow-x-hidden"}>
      <div className="backdrop"></div>
      <div className="noise"></div>
      <div className="dots"></div>
      <div className="canvas min-h-[100dvh]">
        <div
          className={`font-mono ${GeistMono.className} m-auto w-[80%] text-center text-[#cdc8c2] md:w-[50%] md:text-left`}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Footer />
          <Analytics />
        </div>
      </div>
    </main>
  );
};

export default App;
