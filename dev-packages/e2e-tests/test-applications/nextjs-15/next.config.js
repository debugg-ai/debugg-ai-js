const { withDebuggAIConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
};

module.exports = withDebuggAIConfig(nextConfig, {
  silent: true,
});
