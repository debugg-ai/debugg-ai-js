import type { ClientOptions } from '@debugg-ai/core';
import { createTransport, resolvedSyncPromise } from '@debugg-ai/core';

export function getDefaultNodeClientOptions(options: Partial<ClientOptions> = {}): ClientOptions {
  return {
    dsn: 'http://examplePublicKey@localhost/0',
    integrations: [],
    transport: () => createTransport({ recordDroppedEvent: () => undefined }, _ => resolvedSyncPromise({})),
    stackParser: () => [],
    ...options,
  };
}
