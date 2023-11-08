import { type AppType } from "next/dist/shared/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font";

import "@/styles/globals.css";
import Footer from "@/components/footer";
import Layout from "@/pages/Layout";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={`m-auto w-[80%] bg-[#171717] text-center font-mono text-[#cdc8c2] md:w-[50%] md:text-left ${GeistSans.className}`}
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
