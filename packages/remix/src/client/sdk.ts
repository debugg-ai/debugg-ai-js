/* eslint-enable @typescript-eslint/no-unused-vars */
import type { Client } from '@debugg-ai/core';
import { applySdkMetadata } from '@debugg-ai/core';
import { init as reactInit } from '@sentry/react';
import type { RemixOptions } from '../utils/remixOptions';

/**
 * Initializes the Remix SDK.
 * @param options The configuration options.
 * @returns The initialized SDK.
 */
export function init(options: RemixOptions): Client | undefined {
  const opts = {
    ...options,
    environment: options.environment || process.env.NODE_ENV,
  };

  // @ts-expect-error
  applySdkMetadata(opts, 'remix', ['remix', 'react']);

  // @ts-expect-error
  return reactInit(opts);
}
