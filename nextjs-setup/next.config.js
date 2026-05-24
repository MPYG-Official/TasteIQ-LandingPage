const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** Root for tasteiq.in (empty). Set GITHUB_PAGES_PREVIEW=1 only for github.io subpath previews. */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.GITHUB_PAGES_PREVIEW === '1'
      ? '/TasteIQ-LandingPage'
      : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: false,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/product',
        destination: '/fnb',
        permanent: true,
      },
      {
        source: '/product/:path*',
        destination: '/fnb/:path*',
        permanent: true,
      },
      {
        source: '/foods',
        destination: 'https://foods.tasteiq.in',
        permanent: true,
      },
      {
        source: '/foods/:path*',
        destination: 'https://foods.tasteiq.in/:path*',
        permanent: true,
      },
      {
        source: '/affiliate',
        destination: 'https://foods.tasteiq.in',
        permanent: true,
      },
      {
        source: '/affiliate/:path*',
        destination: 'https://foods.tasteiq.in/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
