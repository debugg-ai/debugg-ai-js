import * as os from 'node:os';
import type { Integration, Options } from '@debugg-ai/core';
import {
  applySdkMetadata,
  functionToStringIntegration,
  hasSpansEnabled,
  inboundFiltersIntegration,
  linkedErrorsIntegration,
  requestDataIntegration,
} from '@debugg-ai/core';
import type { NodeClient } from '@sentry/node';
import {
  consoleIntegration,
  contextLinesIntegration,
  getAutoPerformanceIntegrations,
  httpIntegration,
  init as initNode,
  modulesIntegration,
  nativeNodeFetchIntegration,
  nodeContextIntegration,
  onUncaughtExceptionIntegration,
  onUnhandledRejectionIntegration,
} from '@sentry/node';
import { bunServerIntegration } from './integrations/bunserver';
import { makeFetchTransport } from './transports';
import type { BunOptions } from './types';

/** Get the default integrations for the Bun SDK. */
export function getDefaultIntegrations(_options: Options): Integration[] {
  // We return a copy of the defaultIntegrations here to avoid mutating this
  return [
    // Common
    // TODO(v10): Replace with eventFiltersIntegration once we remove the deprecated `inboundFiltersIntegration`
    // eslint-disable-next-line deprecation/deprecation
    inboundFiltersIntegration(),
    functionToStringIntegration(),
    linkedErrorsIntegration(),
    requestDataIntegration(),
    // Native Wrappers
    // @ts-expect-error
    consoleIntegration(),
    // @ts-expect-error
    httpIntegration(),
    // @ts-expect-error
    nativeNodeFetchIntegration(),
    // Global Handlers
    // @ts-expect-error
    onUncaughtExceptionIntegration(),
    // @ts-expect-error
    onUnhandledRejectionIntegration(),
    // Event Info
    // @ts-expect-error
    contextLinesIntegration(),
    // @ts-expect-error
    nodeContextIntegration(),
    // @ts-expect-error
    modulesIntegration(),
    // Bun Specific
    bunServerIntegration(),
    // @ts-expect-error
    ...(hasSpansEnabled(_options) ? getAutoPerformanceIntegrations() : []),
  ];
}

/**
 * The Sentry Bun SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible in the
 * main entry module. To set context information or send manual events, use the
 * provided methods.
 *
 * @example
 * ```
 *
 * const { init } = require('@sentry/bun');
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 *
 * const { addBreadcrumb } = require('@sentry/node');
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 *
 * const Sentry = require('@sentry/node');
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 * ```
 *
 * @see {@link BunOptions} for documentation on configuration options.
 */
export function init(userOptions: BunOptions = {}): NodeClient | undefined {
  applySdkMetadata(userOptions, 'bun');

  const options = {
    ...userOptions,
    platform: 'javascript',
    runtime: { name: 'bun', version: Bun.version },
    serverName: userOptions.serverName || global.process.env.SENTRY_NAME || os.hostname(),
  };

  options.transport = options.transport || makeFetchTransport;

  if (options.defaultIntegrations === undefined) {
    options.defaultIntegrations = getDefaultIntegrations(options);
  }

  // @ts-expect-error
  return initNode(options);
}
