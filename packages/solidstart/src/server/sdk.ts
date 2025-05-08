import { applySdkMetadata } from '@debugg-ai/core';
import type { NodeClient, NodeOptions } from '@sentry/node';
import { init as initNodeSdk } from '@sentry/node';
import { filterLowQualityTransactions } from './utils';

/**
 * Initializes the server side of the Solid Start SDK
 */
export function init(options: NodeOptions): NodeClient | undefined {
  const opts = {
    ...options,
  };

  // @ts-expect-error
  applySdkMetadata(opts, 'solidstart', ['solidstart', 'node']);
  // @ts-expect-error
  filterLowQualityTransactions(opts);

  return initNodeSdk(opts);
}
