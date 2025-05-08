import { applySdkMetadata } from '@debugg-ai/core';
import type { NodeClient, NodeOptions } from '@sentry/node';
import { init as initNodeSdk } from '@sentry/node';

/**
 *
 * @param options
 */
export function init(options: NodeOptions): NodeClient | undefined {
  const opts = {
    ...options,
  };

  // @ts-expect-error
  applySdkMetadata(opts, 'astro', ['astro', 'node']);

  return initNodeSdk(opts);
}
