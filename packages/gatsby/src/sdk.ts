import type { Client } from '@debugg-ai/core';
import { applySdkMetadata } from '@debugg-ai/core';
import { init as reactInit } from '@sentry/react';
import type { GatsbyOptions } from './utils/types';

/**
 * Inits the Sentry Gatsby SDK.
 */
export function init(options: GatsbyOptions): Client | undefined {
  // @ts-expect-error
  applySdkMetadata(options, 'gatsby');
  // @ts-expect-error
  return reactInit({
    ...options,
  });
}
