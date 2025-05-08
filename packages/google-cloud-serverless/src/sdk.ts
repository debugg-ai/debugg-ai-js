import type { Integration, Options } from '@debugg-ai/core';
import { applySdkMetadata } from '@debugg-ai/core';
import type { NodeClient, NodeOptions } from '@sentry/node';
import { getDefaultIntegrationsWithoutPerformance, init as initNode } from '@sentry/node';
import { googleCloudGrpcIntegration } from './integrations/google-cloud-grpc';
import { googleCloudHttpIntegration } from './integrations/google-cloud-http';

function isCjs(): boolean {
  return typeof require !== 'undefined';
}

function getCjsOnlyIntegrations(): Integration[] {
  return isCjs()
    ? [
        googleCloudHttpIntegration({ optional: true }), // We mark this integration optional since '@google-cloud/common' module could be missing.
        googleCloudGrpcIntegration({ optional: true }), // We mark this integration optional since 'google-gax' module could be missing.
      ]
    : [];
}

/** Get the default integrations for the GCP SDK. */
export function getDefaultIntegrations(_options: Options): Integration[] {
  // @ts-expect-error
  return [...getDefaultIntegrationsWithoutPerformance(), ...getCjsOnlyIntegrations()];
}

/**
 * @see {@link Sentry.init}
 */
export function init(options: NodeOptions = {}): NodeClient | undefined {
  const opts = {
    // @ts-expect-error
    defaultIntegrations: getDefaultIntegrations(options),
    ...options,
  };

  // @ts-expect-error
  applySdkMetadata(opts, 'google-cloud-serverless');

  // @ts-expect-error
  return initNode(opts);
}
