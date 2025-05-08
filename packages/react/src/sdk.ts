import type { BrowserOptions } from '@debugg-ai/browser';
import { init as browserInit, setContext } from '@debugg-ai/browser';
import type { Client } from '@debugg-ai/core';
import { applySdkMetadata } from '@debugg-ai/core';
import { version } from 'react';

/**
 * Inits the React SDK
 */
export function init(options: BrowserOptions): Client | undefined {
  const opts = {
    ...options,
  };

  applySdkMetadata(opts, 'react');
  setContext('react', { version });
  return browserInit(opts);
}
