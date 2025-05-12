const { withDebuggAIConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withDebuggAIConfig(nextConfig, {
  silent: true,
});
