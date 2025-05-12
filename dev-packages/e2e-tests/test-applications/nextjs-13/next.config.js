const { withDebuggAIConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const moduleExports = {
  typescript: {
    ignoreBuildErrors: true, // TODO: Remove this
  },
  experimental: {
    appDir: true,
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts', 'page.tsx'],
};

module.exports = withDebuggAIConfig(moduleExports, {
  silent: true,
  excludeServerRoutes: ['/api/endpoint-excluded-with-string', /\/api\/endpoint-excluded-with-regex/],
});
