import type { Options } from '@debugg-ai/core';
import type { NodeOptions } from '@sentry/node';
import type { BrowserOptions } from '@sentry/react';

export type RemixOptions = (Options | BrowserOptions | NodeOptions) & {
  captureActionFormDataKeys?: Record<string, string | boolean>;
};
