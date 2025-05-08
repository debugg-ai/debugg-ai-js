import { getDefaultIntegrations, init as browserInit } from '@sentry/browser';
import type { Client } from '@debugg-ai/core';
import { applySdkMetadata } from '@debugg-ai/core';
import { vueIntegration } from './integration';
import type { Options } from './types';

/**
 * Inits the Vue SDK
 */
export function init(options: Partial<Omit<Options, 'tracingOptions'>> = {}): Client | undefined {
  const opts = {
    defaultIntegrations: [...getDefaultIntegrations(options), vueIntegration()],
    ...options,
  };

  // @ts-expect-error
  applySdkMetadata(opts, 'vue');

  // @ts-expect-error
  return browserInit(opts);
}
