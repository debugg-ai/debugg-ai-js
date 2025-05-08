import { getDefaultIntegrations as getBrowserDefaultIntegrations, init as initBrowser } from '@sentry/browser';
import type { Client } from '@debugg-ai/core';
import { applySdkMetadata } from '@debugg-ai/core';
import type { SentryNuxtClientOptions } from '../common/types';

/**
 * Initializes the client-side of the Nuxt SDK
 *
 * @param options Configuration options for the SDK.
 */
export function init(options: SentryNuxtClientOptions): Client | undefined {
  const sentryOptions = {
    /* BrowserTracing is added later with the Nuxt client plugin */
    defaultIntegrations: [...getBrowserDefaultIntegrations(options)],
    ...options,
  };

  // @ts-expect-error
  applySdkMetadata(sentryOptions, 'nuxt', ['nuxt', 'vue']);

  // @ts-expect-error
  return initBrowser(sentryOptions);
}
