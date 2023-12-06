// https://zenn.dev/duo3/articles/dbb8115309059e
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  compiler: {
    removeConsole: true,
  },
};

module.exports = nextConfig;
