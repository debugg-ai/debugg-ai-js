const { withDebuggAIConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {}, // Enables Turbopack for builds
  },
};

module.exports = withDebuggAIConfig(nextConfig, {
  silent: true,
  release: {
    name: 'foobar123',
  },
});
