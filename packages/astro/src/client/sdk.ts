import type { BrowserOptions } from '@sentry/browser';
import {
  browserTracingIntegration,
  getDefaultIntegrations as getBrowserDefaultIntegrations,
  init as initBrowserSdk,
} from '@sentry/browser';
import type { Client, Integration } from '@debugg-ai/core';
import { applySdkMetadata } from '@debugg-ai/core';

// Tree-shakable guard to remove all code related to tracing
declare const __SENTRY_TRACING__: boolean;

/**
 * Initialize the client side of the Sentry Astro SDK.
 *
 * @param options Configuration options for the SDK.
 */
export function init(options: BrowserOptions): Client | undefined {
  const opts = {
    defaultIntegrations: getDefaultIntegrations(options),
    ...options,
  };

  // @ts-expect-error
  applySdkMetadata(opts, 'astro', ['astro', 'browser']);

  // @ts-expect-error
  return initBrowserSdk(opts);
}

function getDefaultIntegrations(options: BrowserOptions): Integration[] {
  // This evaluates to true unless __SENTRY_TRACING__ is text-replaced with "false",
  // in which case everything inside will get tree-shaken away
  if (typeof __SENTRY_TRACING__ === 'undefined' || __SENTRY_TRACING__) {
    // @ts-expect-error
    return [...getBrowserDefaultIntegrations(options), browserTracingIntegration()];
  } else {
    // @ts-expect-error
    return getBrowserDefaultIntegrations(options);
  }
}
