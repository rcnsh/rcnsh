await import("./src/env.mjs");
import nextMdx from '@next/mdx'

const withMdx = nextMdx({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
})

const config = withMdx({
  reactStrictMode: true,
    pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        hostname: 'i.scdn.co',
      },
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});




export default config;
