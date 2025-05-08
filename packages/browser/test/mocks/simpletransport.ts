import { createTransport, resolvedSyncPromise } from '@debugg-ai/core';

export function makeSimpleTransport() {
  return createTransport({ recordDroppedEvent: () => undefined }, () => resolvedSyncPromise({}));
}
