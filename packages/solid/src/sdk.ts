import type { BrowserOptions } from '@sentry/browser';
import { init as browserInit } from '@sentry/browser';
import type { Client } from '@debugg-ai/core';
import { applySdkMetadata } from '@debugg-ai/core';

/**
 * Initializes the Solid SDK
 */
export function init(options: BrowserOptions): Client | undefined {
  const opts = {
    ...options,
  };

  // @ts-expect-error
  applySdkMetadata(opts, 'solid');

  // @ts-expect-error
  return browserInit(opts);
}
