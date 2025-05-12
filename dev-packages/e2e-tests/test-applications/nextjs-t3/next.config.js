await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {};

import { withDebuggAIConfig } from '@sentry/nextjs';

export default withDebuggAIConfig(config, {
  disableLogger: true,
  silent: true,
});
